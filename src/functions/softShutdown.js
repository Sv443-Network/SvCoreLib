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
