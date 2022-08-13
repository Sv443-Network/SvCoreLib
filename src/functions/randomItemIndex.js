const randRange = require("./randRange");

function randomItemIndex(array)
{
    if(!Array.isArray(array))
        throw new Error("Parameter is not an array");
    
    if(array.length === 0)
        return [undefined, undefined];

    const idx = randRange(0, array.length - 1);

    return [array.at(idx), idx];
}

module.exports = randomItemIndex;
