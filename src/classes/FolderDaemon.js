const minimatch = require("minimatch");
const fs = require("fs-extra");
const { resolve, join } = require("path");
const crypto = require("crypto");
const reserialize = require("../functions/reserialize");
const { diff } = require("deep-diff");
const readdirRecursive = require("../functions/filesystem/readdirRecursive");


class InvalidPathError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "Invalid Path Error";
    }
}

class NotAFolderError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "Not A Folder Error";
    }
}

class PatternInvalidError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "Pattern Invalid Error";
    }
}


class FolderDaemon
{
    constructor(folderPath, filesBlacklist, recursive = false, updateInterval = 500)
    {
        updateInterval = parseInt(updateInterval);

        if((!updateInterval && updateInterval !== 0) || isNaN(updateInterval))
            updateInterval = 500;

        try
        {
            let dirPath = resolve(folderPath);

            if(!fs.pathExistsSync)
                throw new InvalidPathError(`Path "${dirPath}" is invalid or couldn't be resolved`);

            if(!fs.statSync(dirPath).isDirectory())
                throw new NotAFolderError(`Path "${dirPath}" is not a folder`);

            this._dirPath = dirPath;
        }
        catch(err)
        {
            throw new InvalidPathError(`Path "${folderPath}" is invalid or couldn't be resolved`);
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

                        let fileStream = fs.createReadStream(filePath);
                        let hash = crypto.createHash("sha1");
                        
                        hash.setEncoding("hex");

                        fileStream.on("end", () => {
                            hash.end();

                            return hashResolve({
                                path: filePath,
                                hash: hash.read()
                            });
                        });

                        fileStream.pipe(hash);
                    });
                }

                files.forEach(file => {
                    this._blacklistPattern.forEach(pattern => {
                        if(minimatch(file, pattern))
                            return;
                        
                        let filePath = !this._recursive ? join(this._dirPath, file) : file;

                        promises.push(hashFile(filePath));
                    });
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
                    return this._promiseReject(`Error while scanning through folder: ${err}`);
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
