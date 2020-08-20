const isArrayEmpty = array => {
    let isEmpty = require("./isEmpty");

    if((array === "" || array == null) || typeof array != "object")
        throw new Error(`Wrong or empty arguments provided for svc.isArrayEmpty() - (expected: "object", got: "${typeof array}")`);

    let emptiness = 0;
    array.forEach(item => {
        if(isEmpty(item))
            emptiness++;
    });

    if(emptiness == array.length)
        return true;
    else if(emptiness == 0)
        return false;
    else return emptiness;
}
module.exports = isArrayEmpty;
