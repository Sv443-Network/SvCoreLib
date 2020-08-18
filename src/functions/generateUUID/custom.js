/**
 * 🔹 Creates a custom UUID with a given format from a list of characters specified by the possibleValues parameter. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @param {String} possibleValues A string containing all characters that should be injected into the final UUID - (delimited by nothing) - Example: "ABCDEF01234$%&#"
 * @returns {String}
 * @since 1.8.0
 */
const custom = (uuidFormat, possibleValues) => {
    let isEmpty = require("../isEmpty");
    let replaceAt = require("../replaceAt");
    let randRange = require("../randRange");

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = possibleValues.toString();
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
    return result;
}
module.exports = custom;
