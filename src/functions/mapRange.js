/**
 * 🔹 Transforms the `value` parameter from the numerical range [`range_1_min`-`range_1_max`] to the numerical range [`range_2_min`-`range_2_max`] 🔹
 * @param {Number} value The value from the first numerical range, that you want to transform to a value inside the second numerical range
 * @param {Number} range_1_min The lowest possible value of the first numerical range
 * @param {Number} range_1_max The highest possible value of the first numerical range
 * @param {Number} range_2_min The lowest possible value of the second numerical range
 * @param {Number} range_2_max The highest possible value of the second numerical range
 * @returns {Number} Floating point number of `value` inside the second numerical range
 * @throws Throws an error if the arguments are not of type `Number` or the `*_max` argument(s) is/are equal to 0
 * @since 1.8.0
 */
const mapRange = (value, range_1_min, range_1_max, range_2_min, range_2_max) => {
    [value, range_1_min, range_1_max, range_2_min, range_2_max].forEach(arg => {
        if(isNaN(parseInt(arg)) || typeof arg != "number")
            throw new Error("Wrong argument(s) provided for mapRange() - (expected: \"Number\", got: \"" + typeof arg + "\")");
    });

    if(parseFloat(range_1_max) === 0.0 || parseFloat(range_2_max) === 0.0)
        throw new Error("Division by zero error in mapRange() - make sure the \"range_1_max\" and \"range_2_max\" arguments are not 0");

    if(parseFloat(range_1_min) === 0.0 && parseFloat(range_2_min) === 0.0)
        return value * (range_2_max / range_1_max);

    return ((value - range_1_min) * ((range_2_max - range_2_min) / (range_1_max - range_1_min)) + range_2_min);
}
module.exports = mapRange;
