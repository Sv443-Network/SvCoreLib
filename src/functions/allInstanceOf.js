const isClass = require("./isClass");

function allInstanceOf(arr, Class)
{
    if(!Array.isArray(arr) || !isClass(Class))
        throw new TypeError(`Parameters in allInstanceOf() are invalid. Expected array of any and class reference.`);

    if(arr.length === 0)
        return false;

    return arr.reduce((a, c) => a + (c instanceof Class ? 0 : 1), 0) === 0;
}

module.exports = allInstanceOf;
