/**
 * 🔹 Tests an array and returns true if all values are equal. 🔹
 * @param {Array} array
 * @returns {Boolean} true if all values are equal, false if not
 * @throws Throws an error if the parameter is not an array
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of returning string
 */
const allEqual = array => {
    if(!Array.isArray(array)) 
        throw new Error(`Wrong arguments provided for svc.allEqual() - (expected: "Object", got: "${typeof array}")`);

    return array.every(v => v === array[0]);
}
module.exports = allEqual;
