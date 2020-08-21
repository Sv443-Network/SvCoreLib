// const minimatch = require("minimatch");
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
        // TODO:
    }

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

                        // let fileStream = fs.createReadStream(filePath);

                        // TODO:
                    });
                }
            }
        });
    }
}

module.exports = FolderDaemon;
