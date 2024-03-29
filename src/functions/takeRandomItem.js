const randomItemIndex = require("./randomItemIndex");

function takeRandomItem(arr)
{
    if(!Array.isArray(arr))
        throw new Error("Parameter is not an array");

    if(arr.length === 0)
        return undefined;

    const [itm, idx] = randomItemIndex(arr);

    arr.splice(idx, 1);
    return itm;
}

module.exports = takeRandomItem;
