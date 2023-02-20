let inspector;
try {
    inspector = require("inspector");
}
catch(e) { void e; }

const unused = require("../unused");

function inDebugger(checkArg)
{
    try
    {
        if(typeof checkArg === "string" && checkArg.length > 0)
            return process.argv.join(" ").includes(checkArg);
    }
    catch(err)
    {
        unused(err);
    }

    return (
        typeof v8debug === "object"
        || /--debug|--inspect/.test(process.execArgv.join(" "))
        || (inspector.url && typeof inspector.url() === "string")
    );
}

module.exports = inDebugger;
