const { performance } = require("perf_hooks");

function randRange(min, max)
{
    if(typeof min != "number" || typeof max != "number")
        throw new Error(`Wrong parameter provided for "min" and/or "max" in scl.randRange() - (expected: "number" and "number", got: "${typeof min}" and "${typeof max}")`);

    min = parseInt(min);
    max = parseInt(max);

    if(min > max)
        throw new Error(`Invalid parameters provided for "min" and/or "max" in scl.randRange() - make sure "min" is not bigger than "max"`);
    max++;

    let d = new Date().getTime();
    if(typeof performance != "undefined" && typeof performance.now == "function")
        d += performance.now();
    
    let r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}

module.exports = randRange;
