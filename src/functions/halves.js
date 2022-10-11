const splitIntoParts = require("./splitIntoParts");

/** @param {any[]} arr */
function halves(array)
{
    if(!Array.isArray(array))
        throw new TypeError("Invalid argument 'array' provided in halves()");

    return splitIntoParts(array, 2, true);
}

module.exports = halves;
