const http = require("http");

require("../unused")(http);

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
