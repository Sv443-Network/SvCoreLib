/**
 * 🔹 Checks how many values of the array are empty (does the same check as `svc.isEmpty()`, but on each array item) 🔹
 * @param {Array} array Array that should be checked
 * @returns {(Boolean|Number)} true if all are empty, false if none are empty and number if only some are empty
 * @throws Throws an error if the parameter isn't an array
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of returning string
 */
const isArrayEmpty = array => {
    let isEmpty = require("./isEmpty");

    if((array === "" || array == null) || typeof array != "object")
        throw new Error(`Wrong or empty arguments provided for svc.isArrayEmpty() - (expected: "object", got: "${typeof array}")`);

    let emptiness = 0;
    array.forEach(item => {
        if(isEmpty(item))
            emptiness++;
    });

    if(emptiness == array.length)
        return true;
    else if(emptiness == 0)
        return false;
    else return emptiness;
}
module.exports = isArrayEmpty;
