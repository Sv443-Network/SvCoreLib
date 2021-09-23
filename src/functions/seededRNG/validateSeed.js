function validateSeed(seed)
{
    if(!["string", "number"].includes(typeof(seed)))
        throw new TypeError(`validateSeed(): expected parameter of type string or number but got '${typeof seed}'`);

    seed = seed.toString();

    if(seed.startsWith("0"))
        return false;

    const digitCount = seed.length;

    const regex = new RegExp(`^[0-9]{${digitCount}}`, "gm");

    if(!seed.match(regex) || seed.match(/\n/gm))
        return false;

    return true;
}

module.exports = validateSeed;
