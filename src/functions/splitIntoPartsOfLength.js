function splitIntoPartsOfLength(array, maxLength)
{
    if(typeof maxLength !== "number" || isNaN(maxLength) || maxLength < 1)
        throw new TypeError("Invalid argument 'maxLength' provided in splitIntoPartsOfLength()");
    if(!Array.isArray(array))
        throw new TypeError("Invalid argument 'array' provided in splitIntoPartsOfLength()");

    if(array.length === 0)
        return [];

    const arr = [...array];
    const result = [];

    while(arr.length > 0)
        result.push(arr.splice(0, maxLength));

    return result;
}

module.exports = splitIntoPartsOfLength;
