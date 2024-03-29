function splitIntoParts(array, partsAmt, balanced = false)
{
    if(!Array.isArray(array))
        throw new TypeError("Invalid argument 'array' provided in splitIntoParts()");

    if(typeof partsAmt !== "number" || isNaN(partsAmt))
        throw new TypeError("Invalid argument 'partsAmt' provided in splitIntoParts()");

    // credits to https://stackoverflow.com/a/8189268/8602926 lol
    if(partsAmt < 2)
        return [array];

    const len = array.length,
        out = [];
    let size,
        i = 0;

    if(len % partsAmt === 0)
    {
        size = Math.floor(len / partsAmt);
        while(i < len)
            out.push(array.slice(i, i += size));
    }
    else if(balanced === true)
    {
        while(i < len)
        {
            size = Math.ceil((len - i) / partsAmt--);
            out.push(array.slice(i, i += size));
        }
    }
    else
    {
        partsAmt--;
        size = Math.floor(len / partsAmt);
        if(len % size === 0)
            size--;
        while(i < size * partsAmt)
            out.push(array.slice(i, i += size));
        out.push(array.slice(size * partsAmt));
    }

    return out;
}

module.exports = splitIntoParts;
