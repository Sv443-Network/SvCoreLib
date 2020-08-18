/**
 * 🔹 Returns true, if the input is undefined, null, an empty string, an empty array or an object with length = 0. 
 * Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed! 🔹
 * @param {*} input Variable that should be checked - this can be of any type but the basic types will work best
 * @returns {Boolean} true or false
 * @since 1.4.0
 * @version 1.6.5 lowercase alias svc.isempty was removed
 * @version 1.8.0 Added check for objects with length = 0
 */
const isEmpty = input => {
    return ((input != null && typeof input == "object" && !isNaN(parseInt(input.length)) && input.length <= 0) // arrays
        || input === undefined || input === null || input === "") // other
        ? true : false;
}
module.exports = isEmpty;
