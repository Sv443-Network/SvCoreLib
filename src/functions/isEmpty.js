const isEmpty = input => {
    return ((input != null && typeof input == "object" && !isNaN(parseInt(input.length)) && input.length <= 0) // arrays
        || input === undefined || input === null || input === "") // other
        ? true : false;
}
module.exports = isEmpty;
