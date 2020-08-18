/**
 * 🔹 Executes a synchronous function before the process gets shut down (on SIGINT or SIGTERM). 
 * This can be used to close files, abort connections or just to print a console message before shutdown. 🔹  
 * - ⚠️ Asynchronous function execution is not supported (yet)
 * - ⚠️ If `svc.noShutdown()` was used, the passed function will be executed, but the process will not exit
 * @param {Function} funct This function will get executed before process shutdown
 * @param {Number} [code=0] The exit code with which the process should be closed. Defaults to 0
 * @returns {void}
 * @since 1.5.0
 * @version 1.8.0 Added "code" parameter to specify an exit code
 * @version 1.9.0 Function will now still be called when `svc.noShutdown()` was used
 * @version 1.9.4 Removed signal SIGKILL because it caused crashes on Linux
 */
const softShutdown = (funct, code) => {
    code = parseInt(code);

    if(isNaN(code) || code < 0)
        code = 0;

    let onbeforeshutdown = exitCode => {
        if(typeof funct == "function")
            funct();
        if(!process.svc.noShutdown)
            process.exit(exitCode);
        return;
    }
    
    process.on("SIGINT", ()=>onbeforeshutdown(code));
    process.on("SIGTERM", ()=>onbeforeshutdown(code));
}

module.exports = softShutdown;
