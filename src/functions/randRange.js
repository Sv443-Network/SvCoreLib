function randRange(...args)
{
    let min, max;

    if(typeof args[0] === "number" && typeof args[1] === "number")
    {
        // using randRange(min, max)
        [ min, max ] = args;
    }
    else if(typeof args[0] === "number" && typeof args[1] !== "number")
    {
        // using randRange(max)
        min = 0;
        max = args[0];
    }
    else
        throw new TypeError(`Wrong parameter provided in scl.randRange() - (expected: "number" and "number|undefined", got: "${typeof min}" and "${typeof max}")`);

    min = parseInt(min);
    max = parseInt(max);

    if(isNaN(min) || isNaN(max))
        throw new TypeError(`Invalid parameters provided in scl.randRange() - "min" and "max" can't be NaN`);

    if(min > max)
        throw new TypeError(`Invalid parameters provided in scl.randRange() - make sure "min" is not bigger than "max"`);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = randRange;
