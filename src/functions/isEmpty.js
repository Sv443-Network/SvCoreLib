const isEmpty = input => {
    return ((input != null && typeof input == "object" && !isNaN(parseInt(input.length)) && input.length <= 0) // arrays
        || (typeof input == "object" && !Array.isArray(input) && Object.keys(input).length == 0) // objects
        || input === undefined || input === null || input === "") // other
        ? true : false;
}
module.exports = isEmpty;
