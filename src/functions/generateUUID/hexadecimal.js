/**
 * 🔹 Creates a hexadecimal [0-9,A-F] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @param {Boolean} [upperCase] Set to true to have all letters in upper case, false for lower case
 * @returns {String}
 * @since 1.5.0
 * @version 1.8.0 Renamed the function and moved it
 */
const hexadecimal = (uuidFormat, upperCase = false) => {
    let isEmpty = require("../isEmpty");
    let replaceAt = require("../replaceAt");
    let randRange = require("../randRange");

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "0123456789ABCDEF";
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in svc.generateUUID.decimal() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    if(upperCase) return result;
    else return result.toLowerCase();
}
module.exports = hexadecimal;
