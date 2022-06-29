const allOfType = require("./allOfType");

function clamp(...params)
{
    const [num, min, max] = params;

    if(!allOfType(params, "number"))
        throw new TypeError("Parameters for clamp() need to be of type number");
    if(params.map(p => isNaN(p)).includes(true))
        throw new TypeError("Parameters for clamp() can't be NaN");
    if(min > max)
        throw new TypeError("Parameter min can't be higher than max in clamp()");

    return Math.max(min, Math.min(num, max));
}

module.exports = clamp;
