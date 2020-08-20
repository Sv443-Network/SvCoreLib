const minimatch = require("minimatch");
const fs = require("fs-extra");
const { resolve } = require("path");

/**
 * @typedef {Array<String>} DaemonResult An array of strings containing file paths
 */

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
    /**
     * 🔹 FolderDaemon supervises a folder and listens for changes in the files and then it calls a callback function. 🔹
     * @param {String} folderPath The path to the folder you want the daemon to supervise
     * @param {Array<String>} [filesBlacklist] An optional array of [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)) strings. Example: `['*.js']` will block all .js files from being scanned by the daemon.
     * @param {Number} [updateInterval=500] The interval (in milliseconds) at which to scan for changed files. Defaults to `500` ms. Set to `0` to disable the interval. Then call `intervalCall()` to manually scan the folder.
     * 
     * @throws {InvalidPathError} Throws an `InvalidPathError` if the path to the folder is invalid
     * @throws {NotAFolderError} Throws a `NotAFolderError` if the path leads to a file instead of a folder
     * @throws {PatternInvalidError} Throws a `PatternInvalidError` if the provided glob blacklist pattern is invalid
     * 
     * @since 1.10.0
     */
    constructor(folderPath, filesBlacklist, updateInterval = 500)
    {
        updateInterval = parseInt(updateInterval);

        if(!updateInterval || isNaN(updateInterval))
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

        this._callbackAttached = false;
        this._callbackFn = () => {};
        this._blacklistPattern = filesBlacklist || [];

        this._lastHash = null;
        this._currentHash = null;

        this._interval = setInterval(() => this._intervalCall(), updateInterval);
    }

    /**
     * 🔹 Registers a callback function to be called when the FolderDaemon detects one or more changed files 🔹
     * @param {Function<String|null, DaemonResult>} [callback_fn] Callback function that contains two parameters: the first one, which is either a string or null and the second one which contains an object of type `DaemonResult`
     * @returns {Promise<DaemonResult, String>} Returns a promise that resolves to an array of type `DaemonResult` or rejects to an error message.
     */
    onChanged(callback_fn)
    {
        if(typeof callback_fn == "function")
            this._callbackFn = callback_fn;

        return new Promise((res, rej) => {
            this._promiseResolve = res;
            this._promiseReject = rej;
        });
    }

    /**
     * 🔹 Removes the previously registered callback function(s) 🔹
     * @returns {void}
     */
    removeCallbacks()
    {

    }

    /**
     * 🔹 This is called on interval to check the folder but feel free to manually call it if you set the interval to `0` or if you want to check the folder at a precise time 🔹
     */
    intervalCall()
    {
        fs.readdir(resolve(this._dirPath), (err, files) => {
            if(err)
            {
                this._callbackFn(err);
                this._promiseReject(err);
            }
            else
            {
                if(Array.isArray(files))
                {
                    files.forEach(file => {
                        let filePath = resolve(file);

                        if(!fs.statSync(filePath).isFile())
                            return;

                        let fileStream = fs.createReadStream(filePath);
                    });
                }
            }
        });
    }
}

module.exports = FolderDaemon;
