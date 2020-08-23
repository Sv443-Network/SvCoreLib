function softShutdown(funct, code)
{
    code = parseInt(code);

    if(isNaN(code) || code < 0)
        code = 0;

    let onbeforeshutdown = () => {
        if(typeof funct == "function")
            funct();
        if(!process.svc.noShutdown)
            process.exit(code);
        return;
    };
    
    process.on("SIGINT", onbeforeshutdown);
    process.on("SIGTERM", onbeforeshutdown);
}

module.exports = softShutdown;
