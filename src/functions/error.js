/**
 * 🔹 Sends a red console message and optionally exits the process with an optional status code. 🔹
 * @param {String} cause The cause of the error
 * @param {String} [log_file_path] if the error message should automatically be logged to the file with the specified path. undefined or null to disable.
 * @param {Boolean} [shutdown=false] if the process should be exited or not
 * @param {Number} [status=0] with which status code the process should be exited
 * @param {Boolean} [consoleMsg=false] whether to show a red message in the console or not
 * @throws Throws an error if the "cause" parameter isn't a string
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of logging to console and returning undefined
 */
const error = (cause, log_file_path, shutdown, status, consoleMsg) => {
    let isEmpty = require("./isEmpty");
    let logger = require("./logger");

    if(typeof cause != "string")
        throw new Error(`Wrong arguments provided in "cause" for svc.error() - (expected: "String", got: "${typeof cause}")`);

    if(typeof log_file_path == "string")
        logger(log_file_path, cause, {timestamp:true,append_bottom:true});
    
    if(consoleMsg === true)
        console.log("\x1b[31m\x1b[1mAn error occurred:\n" + cause + "\x1b[0m\n");

    if(shutdown == true && !isEmpty(status))
        process.exit(status);
    else if(shutdown == true && isEmpty(status))
        process.exit(1);
}
module.exports = error;
