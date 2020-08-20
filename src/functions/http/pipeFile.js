const fs = require("fs-extra");
const http = require("http");
const { resolve } = require("path");
require("../unused")(http);

/**
 * 🔹 Pipes a file into a HTTP response. This is a tiny bit faster and much more efficient than loading the file into RAM first. 🔹
 * @param {http.ServerResponse} res The HTTP res object
 * @param {String} filePath Path to the file to respond with - relative to the project root directory
 * @param {String} mimeType The MIME type to respond with
 * @param {Number} [statusCode=200] The status code to respond with - defaults to 200
 * @returns {null|String} Returns `null` if there was no error or a string containing the error message
 */
function pipeFile(res, filePath, mimeType, statusCode = 200)
{
    try
    {
        statusCode = parseInt(statusCode);
        if(isNaN(statusCode))
            statusCode = 200;
    }
    catch(err)
    {
        return "Encountered internal server error while piping file: wrong type for status code.";
    }

    filePath = resolve(filePath);

    if(!fs.existsSync(filePath))
        return `File at "${filePath}" not found.`;

    try
    {
        if(!res.headersSent)
        {
            res.writeHead(statusCode, {
                "Content-Type": `${mimeType}; charset=UTF-8`,
                "Content-Length": fs.statSync(filePath).size
            });
        }

        let readStream = fs.createReadStream(filePath);
        readStream.pipe(res);

        return null;
    }
    catch(err)
    {
        return err;
    }
}

module.exports = pipeFile;
