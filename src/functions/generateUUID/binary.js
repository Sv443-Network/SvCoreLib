/**
 * 🔹 Creates a binary [0-1] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @param {Boolean} [asBooleanArray=false] Set to true to get an array of booleans instead of a string of 1 and 0. Setting this to true will ignore the uuidFormat parameter. Instead, the amount of x's and y's will be equivalent to the resulting array items.
 * @returns {String|Array<Boolean>}
 * @since 1.8.0
 */
const binary = (uuidFormat, asBooleanArray) => {
    let replaceAt = require("../replaceAt");
    let randRange = require("../randRange");
    
    if(typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in svc.generateUUID.binary() - (expected: "String", got: "${typeof uuidFormat}")`);

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "01";
    possible = possible.split("");

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");

    if(asBooleanArray === true)
    {
        let boolResult = [];
        result.split("").forEach(char => {
            if(char == "0")
                boolResult.push(false);
            else if(char == "1")
                boolResult.push(true);
        });

        return boolResult;
    }

    return result;
}
module.exports = binary;
