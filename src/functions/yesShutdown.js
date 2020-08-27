function yesShutdown()
{
    if(process.svc != undefined && !process.svc.noShutdown)
        return;

    if(process.svc == undefined)
        process.svc = {};

    process.svc.noShutdown = false;
    process.on("SIGINT", ()=>process.exit());
    process.on("SIGTERM", ()=>process.exit());
}

module.exports = yesShutdown;
