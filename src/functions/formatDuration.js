const parseDuration = require("./parseDuration");

function formatMs(millis, format, leadingZeroes = true)
{
    millis = parseInt(millis);
    if(typeof millis !== "number" || isNaN(millis) || millis < 0)
        throw new TypeError("Parameter \"millis\" has to be a number that's 0 or higher");

    if(typeof format !== "string")
        throw new TypeError("Parameter \"format\" has to be a string");

    const pad = (num, padAmt) => {
        if(leadingZeroes === false)
            return String(num);

        const getZeroes = amt => {
            let ret = "";
            for(let i = 0; i < amt; i++)
                ret += "0";
            return ret;
        }

        let z = "";

        if(num < 10)
            z = getZeroes(padAmt);
        else if(padAmt === 2 && num < 100)
            z = getZeroes(1);

        return `${z}${num}`;
    }

    const { ms, secs, mins, hrs, days } = parseDuration(millis);

    // return `${days}d, ${hrs}:${min}:${sec}.${ms}`;

    let retVal = String(format);

    [
        { a: "%ms", b: ms,  c: 2 },
        { a: "%s",  b: secs, c: 1 },
        { a: "%m",  b: mins, c: 1 },
        { a: "%h",  b: hrs, c: 1 },
        { a: "%d",  b: days },
    ]
    .forEach(({ a, b, c }) => {
        retVal = retVal.replace(new RegExp(a, "gm"), c ? pad(b, c) : String(b));
    });

    return retVal;
}

module.exports = formatMs;
