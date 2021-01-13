function isEmpty(input)
{
    return ((input != null && Array.isArray(input) && input.length == 0) // arrays
        || (typeof input == "object" && !Array.isArray(input) && Object.keys(input).length == 0) // objects
        || input === undefined || input === null || input === "") // other
        ? true : false;
}

module.exports = isEmpty;
