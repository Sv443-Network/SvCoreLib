function noShutdown()
{
    if(process.svc != undefined && process.svc.noShutdown)
        return;

    if(process.svc == undefined)
        process.svc = {};
    
    process.svc.noShutdown = true;
    process.on("SIGINT", ()=>{});
    process.on("SIGTERM", ()=>{});
}

module.exports = noShutdown;
