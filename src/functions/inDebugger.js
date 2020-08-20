function inDebugger()
{
    return (typeof v8debug === "object" || /--debug|--inspect/.test(process.execArgv.join(" ")));
}

module.exports = inDebugger;
