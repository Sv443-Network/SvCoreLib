/**
 * @typedef {Object} SeededRandomNumbers
 * @prop {Array<Number>} numbers An array of the random numbers
 * @prop {String} stringified The random numbers, but as a string
 * @prop {Number} integer The random numbers, but as an integer
 * @prop {Number} seed The seed that was used to create the random numbers
 */

/**
 * 🔹 Generates random numbers from the numerical range [0-9] based on a seed 🔹
 * @param {Number} [count=16] How many random numbers should be generated - will default to 16 if left empty
 * @param {Number} [seed] The seed to generate numbers from. Leave empty to use a random default seed. The used seed will be included in the returned object
 * @returns {SeededRandomNumbers} An object containing the seed and the random number in three different formats
 * @since 1.8.0
 */
const generateSeededNumbers = (count = 16, seed) => { // thanks to olsn for this code snippet: http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    let isEmpty = require("../isEmpty");
    let generateRandomSeed = require("./generateRandomSeed");
    let validateSeed = require("./validateSeed");
    let result = [];

    if(isEmpty(seed))
        seed = generateRandomSeed();

    if(!validateSeed(seed))
        throw new Error("Error while validating seed in generateSeededNumbers() - Seeds cannot start with 0 and can only contain numerical digits between 0 and 9");

    let initialSeed = seed;

    let seededRandom = (min, max) => {
        max = max || 1;
        min = min || 0;
    
        seed = (seed * 9301 + 49297) % 233280;
        let rnd = seed / 233280;
    
        return Math.floor(min + rnd * (max - min));
    }

    for(let i = 0; i < count; i++)
        result.push(seededRandom(0, 9));

    if(result[0] == 0)
        result[0] = 1; // make sure the first item is not 0, so we can parse it as an int without losing the first digit - this can't be a random number since it needs to be the same every time

    return {
        numbers: result,
        stringified: result.join(""),
        integer: parseInt(result.join("")),
        seed: initialSeed,
    }
}
module.exports = generateSeededNumbers;
