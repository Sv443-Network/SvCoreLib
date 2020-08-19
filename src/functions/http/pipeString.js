/**
 * 🔹 Pipes a string into a HTTP response. This is faster and more efficient than loading the string into RAM first. 🔹
 * @param {http.ServerResponse} res The HTTP res object
 * @param {String} text The response body
 * @param {String} mimeType The MIME type to respond with
 * @param {Number} [statusCode=200] The status code to respond with - defaults to 200
 * @returns {null|String} Returns `null` if there was no error or a string containing the error message
 */
function pipeString(res, text, mimeType, statusCode = 200)
{
    let { Readable } = require("stream");
    let byteLength = require("../byteLength");
    let unused = require("../unused");

    try
    {
        statusCode = parseInt(statusCode);
        if(isNaN(statusCode))
            statusCode = 200;
    }
    catch(err)
    {
        unused(err);
        statusCode = 200;
    }

    let s = new Readable();
    s._read = () => {};
    s.push(text);
    s.push(null);

    if(!res.writableEnded)
    {
        s.pipe(res);

        if(!res.headersSent)
        {
            res.writeHead(statusCode, {
                "Content-Type": `${mimeType}; charset=UTF-8`,
                "Content-Length": byteLength(text) // Content-Length needs the byte length, not the char length
            });
        }
        else
            return "Error: headers were already sent back to the client.";
    }
    else
        return "Error: headers were already sent back to the client.";

    return null;
}

module.exports = pipeString;
