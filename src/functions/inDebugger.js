/**
 * 🔹 Checks if the process is currently running in the debugger environment.
 * This is useful because some features like child processes and reading from stdin do not work in a debugger.
 * Should support all major debuggers. 🔹
 * @returns {Boolean} Returns true, if the process is currently running in a debugger, false if not.
 * @since 1.9.0
 */
function inDebugger()
{
    return (typeof v8debug === "object" || /--debug|--inspect/.test(process.execArgv.join(" ")));
}
module.exports = inDebugger;
