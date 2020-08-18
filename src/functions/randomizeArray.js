/**
 * 🔹 Randomizes all items in an array 🔹
 * @param {Array<any>} array The array that should be randomized
 * @returns {Array<any>} Returns the randomized array
 * @throws Throws an error if the parameter is not an array
 * @since 1.8.0
 */
const randomizeArray = array => {
    let retArray = new Array(...array); // has to be done so array and retArray don't point to the same memory address

    let randRange = require("./randRange");

    if(isNaN(parseInt(array.length)))
        throw new Error(`Parameter in "svc.randomizeArray()" needs to be an array that has to contain at least one item.`);

    // shamelessly stolen from https://javascript.info/task/shuffle
    for(let i = retArray.length - 1; i > 0; i--)
    {
        let j = Math.floor((randRange(0, 10000) / 10000) * (i + 1));
        [retArray[i], retArray[j]] = [retArray[j], retArray[i]];
    }

    return retArray;
}
module.exports = randomizeArray;
