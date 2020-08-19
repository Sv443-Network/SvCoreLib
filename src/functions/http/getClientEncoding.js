const http = require("http");

require("../unused")(http);

/**
 * @typedef {"br"|"gzip"|"deflate"|"compress"|"identity"} EncodingName
 */

/**
 * 🔹 Returns the name of the client's accepted encoding.
 * If the client supports multiple encodings, returns the most efficient and modern encoding.
 * For more information, visit the [MDN documentation page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding) 🔹
 * @param {http.IncomingMessage} req The HTTP `req` object
 * @returns {EncodingName} Returns "identity" if no encodings are supported, else returns the encoding's name
 * @since 1.10.0
 */
const getClientEncoding = req => {
    let selectedEncoding = null;

    let encodingPriority = [ "br", "gzip", "deflate", "compress", "identity" ];

    encodingPriority = encodingPriority.reverse();

    let acceptedEncodings = [];
    if(req.headers["accept-encoding"])
        acceptedEncodings = req.headers["accept-encoding"].split(/\s*[,]\s*/gm);
    acceptedEncodings = acceptedEncodings.reverse();

    encodingPriority.forEach(encPrio => {
        if(acceptedEncodings.includes(encPrio))
            selectedEncoding = encPrio;
    });

    if(selectedEncoding == null)
        selectedEncoding = "identity";

    return selectedEncoding;
}

module.exports = getClientEncoding;
