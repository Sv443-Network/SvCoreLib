/**
 * @typedef {Object} pingReturnValues An object containing the ping's results
 * @prop {Number} statusCode The ping's returned status code (eg. 200 or 404)
 * @prop {String} statusMessage The status message of the ping - Could be something like "Ok" for status 200 or "Not Found" for status 404
 * @prop {Number} responseTime The response time in milliseconds as an integer
 * @prop {String} contentType The `content-type` header - this will contain the MIME type and the content encoding
 */

/**
 * Pings the specified URL and returns the status code
 * @param {String} url The URL that should be pinged
 * @param {Number} [timeout=5000] time in milliseconds after which the ping will time out and return a 404 error
 * @returns {Promise<pingReturnValues>} Promise gets passed the HTTP status code (for example 200 or 404), the status message and the response duration in ms; if errored returns a string with the error message
 * @throws Throws an error if the `url` parameter is not present or malformatted
 * @since 1.6.0
 * @version 1.6.1 changed attributes
 * @version 1.6.5 changed time measurement dependency due to deprecation
 * @version 1.6.6 updated documentation for the resulting object
 * @version 1.8.0 changed time measurement method to be a much more accurate one
 */
const ping = (url, timeout) => {
    let pingTimestamp = new Date().getTime();
    let isEmpty = require("./isEmpty");

    if(typeof url != "string" || isEmpty(url))
        throw new Error("Wrong or empty argument provided for ping() - (expected: \"string\", got: \"" + typeof url + "\")");

    if(isEmpty(timeout) || typeof timeout != "number")
        timeout = 5000;

    let http_version = (url.match(/(http:\/\/)/gm) || url.match(/(https:\/\/)/gm))[0].replace("://", "");


    let host = "", path = "";
    try
    {
        host = url.split("://")[1].split("/")[0];
        path = url.split("://")[1].split("/");
    }
    catch(err)
    {
        throw new Error("URL is formatted incorrectly");
    }


    if(isEmpty(path[1]))
        path = "/";
    else {
        path.shift();
        path = path.join("/");
    }

    let http;

    if(http_version == "https")
        http = require("https");
    else http = require("http");

    return new Promise((resolve, reject) => {
        try {
            http.get({
                host: host,
                path: path,
                timeout: timeout
            }, res => {
                let measuredTime = (new Date().getTime() - pingTimestamp).toFixed(0);
                res.on('data', () => {});
                res.on('end', () => {
                    return resolve({
                        "statusCode": parseInt(res.statusCode),
                        "statusMessage": res.statusMessage,
                        "responseTime": parseInt(measuredTime),
                        "contentType": res.headers["content-type"]
                    });
                });
            });
        }
        catch(err) {
            return reject(err);
        }
    });
}
module.exports = ping;
