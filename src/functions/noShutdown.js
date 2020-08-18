/**
 * 🔹 Prevents the script from shutting down with default commands (CTRL + C).
 * It has to either be killed with the task manager or internally, through the script (using `process.exit()`) 🔹
 * @since 1.5.0
 */
const noShutdown = () => {
    if(process.svc != undefined && process.svc.noShutdown)
        return;

    if(process.svc == undefined)
        process.svc = {};
    
    process.svc.noShutdown = true;
    process.on("SIGINT", ()=>{});
    process.on("SIGTERM", ()=>{});
}
module.exports = noShutdown;
