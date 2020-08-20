const allEqual = array => {
    if(!Array.isArray(array)) 
        throw new Error(`Wrong arguments provided for svc.allEqual() - (expected: "Object", got: "${typeof array}")`);

    return array.every(v => v === array[0]);
}
module.exports = allEqual;
