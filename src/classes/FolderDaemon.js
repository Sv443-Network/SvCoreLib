const minimatch = require("minimatch");
const fs = require("fs-extra");
const { resolve, join, basename } = require("path");
const crypto = require("crypto");
const reserialize = require("../functions/reserialize");
const diff = require("deep-diff");
const readdirRecursive = require("../functions/filesystem/readdirRecursive");

const { InvalidPathError, NotAFolderError, PatternInvalidError } = require("./Errors");


class FolderDaemon
{
    constructor(dirPath, filesBlacklist, recursive = false, updateInterval = 500)
    {
        updateInterval = parseInt(updateInterval);

        if((!updateInterval && updateInterval !== 0) || isNaN(updateInterval))
            updateInterval = 500;

        try
        {
            let dPath = resolve(dirPath);

            if(!fs.pathExistsSync)
                throw new InvalidPathError(`Path "${dPath}" is invalid or couldn't be resolved`);

            if(!fs.statSync(dPath).isDirectory())
                throw new NotAFolderError(`Path "${dPath}" is not a directory`);

            this._dirPath = dPath;
        }
        catch(err)
        {
            throw new InvalidPathError(`Path "${dirPath}" is invalid or couldn't be resolved`);
        }

        if(filesBlacklist != undefined && !Array.isArray(filesBlacklist))
            throw new PatternInvalidError(`Blacklist glob pattern parameter was provided but is not an array containing strings`);

        if(typeof recursive != "boolean")
            recursive = false;
        
        this._recursive = recursive;

        this._callbackAttached = false;
        this._callbackFn = () => {};
        this._blacklistPattern = filesBlacklist || [];

        this._lastHashes = {};
        this._currentHashes = {};

        if(updateInterval > 0)
        {
            this._interval = setInterval(() => this.intervalCall(), updateInterval);
            this.intervalCall();
        }

        return this;
    }

    onChanged(callback_fn)
    {
        if(typeof callback_fn == "function")
            this._callbackFn = callback_fn;

        return new Promise((res, rej) => {
            this._promiseResolve = res;
            this._promiseReject = rej;
        });
    }

    removeCallbacks()
    {
        this._callbackFn = () => {};
        this._promiseResolve = () => {};
        this._promiseReject = () => {};
    }

    intervalCall()
    {
        this.scanDir().then(files => {
            if(Array.isArray(files))
            {
                let promises = [];

                let hashFile = (filePath) => {
                    return new Promise((hashResolve) => {
                        if(!fs.statSync(filePath).isFile())
                            return hashResolve(null);
                        
                        fs.stat(filePath, (err, stats) => {
                            if(err)
                                return hashResolve(null);

                            if(stats.size == 0)
                            {
                                return hashResolve({
                                    path: filePath,
                                    hash: "FILE_EMPTY"
                                });
                            }

                            let fileStream = fs.createReadStream(filePath);
                            let hash = crypto.createHash("sha1");
                            
                            hash.setEncoding("hex");

                            fileStream.on("end", () => {
                                if(hash)
                                {
                                    hash.end();

                                    let hashStr = hash.read();

                                    return hashResolve({
                                        path: filePath,
                                        hash: hashStr
                                    });
                                }
                                else
                                    return hashResolve(null);
                            });

                            fileStream.pipe(hash);
                        });
                    });
                }

                files.forEach(file => {
                    let filePath = !this._recursive ? join(this._dirPath, file) : file;

                    if(Array.isArray(this._blacklistPattern) && this._blacklistPattern.length > 0)
                    {
                        this._blacklistPattern.forEach(pattern => {
                            let match = minimatch(basename(file), pattern);
                            if(match)
                                return;

                            promises.push(hashFile(filePath));
                            return;
                        });
                    }
                    else
                        promises.push(hashFile(filePath));
                });

                Promise.all(promises).then(results => {
                    this._currentHashes = {};

                    results.forEach(result => {
                        if(typeof result == "object" && result != null)
                            this._currentHashes[result.path] = result.hash;
                    });

                    if(Object.keys(this._lastHashes).length == 0)
                        this._lastHashes = reserialize(this._currentHashes);

                    let deepDiff = diff(this._lastHashes, this._currentHashes);

                    if(Array.isArray(deepDiff) && deepDiff.length > 0)
                    {
                        // files have changed
                        let changedFiles = deepDiff.map(match => match.path[0]);

                        this._callbackFn(null, changedFiles);
                        this._promiseResolve(changedFiles);
                    }

                    this._lastHashes = reserialize(this._currentHashes);
                }).catch(err => {
                    return this._promiseReject(`Error while scanning through directory: ${err}`);
                });
            }
        }).catch(err => {
            this._callbackFn(err);
            this._promiseReject(err);
        });
    }

    /**
     * ❌ Private method - don't use ❌
     * @private
     * @returns {Promise<Array<String>>}
     */
    scanDir()
    {
        return new Promise((res, rej) => {
            if(!this._recursive)
            {
                fs.readdir(resolve(this._dirPath), (err, files) => {
                    if(!err)
                        return res(files);
                    else
                        return rej(err);
                });
            }
            else
            {
                readdirRecursive(resolve(this._dirPath)).then(results => {
                    return res(results);
                }).catch(err => {
                    return rej(err);
                })
            }
        });
    }
}

module.exports = FolderDaemon;
