/**
 * 🔹 Logs a string to a specified log file 🔹
 * @param {string} path Relative path to the log file
 * @param {string} content Content that should be written to the log file
 * @param {Object} [options] Additional options
 * @param {boolean} [options.append_bottom=true] true to append content to the bottom of a file, false to just override the file's contents
 * @param {boolean} [options.timestamp=false] true to add a timestamp to the logged content
 * @throws Throws an error if the parameters are of the wrong type or not present
 * @since 1.5.0
 */
function logger(path, content, options) {
    let fs = require("fs");

    if(typeof path != "string" || typeof content != "string")
        throw new Error("path and/or content are empty or of the wrong type");

    let timestamp = new Date().toString();

    if(options.timestamp)
        content = `[${timestamp}]  ${content}`;

    if(!options.append_bottom)
        fs.writeFileSync(path, content);
    else fs.appendFileSync(path, content + "\n");
}
module.exports = logger;
