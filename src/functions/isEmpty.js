function isEmpty(input)
{
    return (
           (input === undefined || input === null || input === "") // other
        || (input != null && Array.isArray(input) && input.length == 0) // arrays
        || (input !== null && typeof input == "object" && !Array.isArray(input) && Object.keys(input).length == 0) // objects
    ) ? true : false;
}

module.exports = isEmpty;
