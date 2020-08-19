/**
 * @typedef {Object} DownloadProgress
 * @prop {Number} currentB The current download progress in bytes
 * @prop {Number} currentKB The current download progress in kilobytes
 * @prop {Number} currentMB The current download progress in megabytes
 * @prop {Number} totalB The total file size in bytes
 * @prop {Number} totalKB The total file size in kilobytes
 * @prop {Number} totalMB The total file size in megabytes
 */

/**
 * @typedef {Function} ProgressCallback
 * @param {DownloadProgress} DownloadProgress
 */

 /**
 * @typedef {Function} FinishedCallback
 * @param {(String|undefined)} error This parameter is null if no error was encountered, or contains a string if an error was encountered
 */

/**
 * @typedef {Object} DownloadOptions
 * @prop {String} fileName The name that the downloaded file should be saved as, including the file extension - for example: "image.png" or "archive.zip" - defaults to "download.txt"
 * @prop {ProgressCallback} progressCallback A callback function that gets called every 50 milliseconds that gets passed an object containing info on the download progress - sometimes the download progress can't be gotten so this callback won't contain the total size or will not be called a final time on finish. This behavior is normal.
 * @prop {FinishedCallback} finishedCallback A callback function that gets called when the download finished and gets passed a parameter that is `null` if no error was encountered, or contains a string if an error was encountered
 */

/**
 * Downloads a file from the specified URL, to the specified destination path, according to the specified options
 * @param {String} url The URL to the file you want to download
 * @param {String} [destPath] The path where the file should be saved to - can be absolute or relative - If left empty, it will default to the root directory of the project - **⚠️ Do not include the file name here - set it in the `options` parameter ⚠️**
 * @param {DownloadOptions} [options]
 * @returns {Promise} Promise that resolves to a void value and rejects to an error string
 * @since 1.8.0
 * @version 1.9.2 Added the option of using the Promise API instead of a callback
 */
const downloadFile = (url, destPath = "./", options) => {
    let isEmpty = require("./isEmpty");
    let fs = require("fs-extra");
    let https = require("https");

    if(isEmpty(options))
        options = {
            fileName: "download.txt",
            progressCallback: () => {},
            finishedCallback: () => {}
        }
    else
    {
        if(isEmpty(options.fileName)) options.fileName = "download.txt";
        if(isEmpty(options.progressCallback)) options.progressCallback = () => {};
        if(isEmpty(options.finishedCallback)) options.finishedCallback = () => {};
    }

    let lastM = false;

    return new Promise((resolve, reject) => {
        let dest = `${destPath}${destPath.endsWith("/") ? "" : "/"}${options.fileName}`;
        if(!fs.existsSync(destPath))
        {
            let err = `Error in svc.downloadFile() - The directory at the path "${destPath}" doesn't exist. Please make sure the directory exists and try again.`;
            reject(err);
            throw new Error(err);
        }

        let urlCl = new URL(url);
        let opts = {
            hostname: urlCl.hostname,
            port: urlCl.protocol === "https:" || urlCl.protocol.includes("https") ? 443 : 80,
            path: urlCl.pathname,
            method: "HEAD"
        };

        let file = fs.createWriteStream(dest);
    
        let req2 = https.request(opts, res2 => {
            if(res2.statusCode >= 300 && res2.statusCode < 400)
                return downloadFile(res2.headers["location"], destPath, options);

            if(res2.statusCode >= 400)
            {
                let err = "Status Code: " + res2.statusCode;
                options.finishedCallback(err);
                return reject(err);
            }

            let totalSize = null;
            if(!isEmpty(res2.headers) && !isEmpty(res2.headers["content-length"]))
                totalSize = parseInt(res2.headers["content-length"]);
                

            let req = https.get(url, res => {
                let sizeUpdateIv;
                if(!isEmpty(options) && !isEmpty(options.progressCallback))
                    sizeUpdateIv = setInterval(() => {
                        let curSize = fs.statSync(dest).size;
                        if(!isEmpty(totalSize))
                            options.progressCallback({
                                currentB: parseFloat(curSize),
                                currentKB: parseFloat((curSize / 1000).toFixed(3)),
                                currentMB: parseFloat((curSize / 1000000).toFixed(3)),
                                totalB: parseFloat(totalSize),
                                totalKB: parseFloat((totalSize / 1000).toFixed(3)),
                                totalMB: parseFloat((totalSize / 1000000).toFixed(3))
                            });
                        else
                            options.progressCallback({
                                currentB: curSize,
                                currentKB: parseFloat((curSize / 1000).toFixed(3)),
                                currentMB: parseFloat((curSize / 1000000).toFixed(3))
                            });
                    }, 50);
                res.pipe(file);
        
                file.on("finish", () => {
                    if(!isEmpty(options.progressCallback)) clearInterval(sizeUpdateIv);
                    if(fs.statSync(dest).size == totalSize && !lastM)
                    {
                        lastM = true;
                        if(!isEmpty(totalSize) && !isEmpty(options) && !isEmpty(options.progressCallback))
                            options.progressCallback({
                                currentB: parseFloat(totalSize),
                                currentKB: parseFloat((totalSize / 1000).toFixed(3)),
                                currentMB: parseFloat((totalSize / 1000000).toFixed(3)),
                                totalB: parseFloat(totalSize),
                                totalKB: parseFloat((totalSize / 1000).toFixed(3)),
                                totalMB: parseFloat((totalSize / 1000000).toFixed(3))
                            });
                    }
        
                    let cb = () => {
                        options.finishedCallback(null);
                        return resolve();
                    };
                    file.close(cb);
                });
            });
        
            req.on("error", err => {
                fs.unlink(dest, () => {
                    options.finishedCallback(err);
                    return reject(err);
                });
            });

            req.end();
        });

        req2.on("error", e => {
            let err = `Error while reading remote file information: ${e}`;
            reject(err);
            throw new Error(err);
        });

        req2.end();
    });
}
module.exports = downloadFile;
