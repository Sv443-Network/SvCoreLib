const splitIntoParts = require("./splitIntoParts");

/** @param {any[]} arr */
function halves(arr)
{
    if(!Array.isArray(arr))
        throw new TypeError("Parameter is not an array");

    return splitIntoParts(arr, 2, true);
}

module.exports = halves;
