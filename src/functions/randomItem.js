const randomItemIndex = require("./randomItemIndex");

function randomItem(array)
{
    return randomItemIndex(array)[0];
}

module.exports = randomItem;
