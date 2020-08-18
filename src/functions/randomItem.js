/**
 * 🔹 Chooses a random item in an array and returns it 🔹
 * @param {Array<*>} array An array of any size, with any values contained inside
 * @returns {*} Returns a random item of the provided array
 * @since 1.9.4
 */
function randomItem(array)
{
    if(!Array.isArray(array))
        throw new Error("Parameter is not an array");
    
    if(array.length <= 0)
        throw new Error("Array doesn't contain any items");

    let randRange = require("./randRange");

    return array[randRange(0, array.length - 1)];
}

module.exports = randomItem;
