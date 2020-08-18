/**
 * 🔹 Highly random number generator with upper and lower boundary.
 * `Highly random` means that contrary to `Math.random()` which uses a seed, this RNG additionally uses a timestamp to calculate the number, making it much more random. 🔹
 * ⚠️ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function! If you know how to implement that, feel free to submit a merge request :) ⚠️
 * @param {number} min Lower boundary of the RNG
 * @param {number} max Upper boundary of the RNG
 * @since 1.5.0
 */
const randRange = (min, max) => {
    let { performance } = require("perf_hooks");

    if(typeof min != "number" || typeof max != "number")
        throw new Error(`Wrong parameter provided for "min" and/or "max" in svc.randRange() - (expected: "number" and "number", got: "${typeof min}" and "${typeof max}")`);

    min = parseInt(min);
    max = parseInt(max);

    if(min > max)
        throw new Error(`Invalid parameters provided for "min" and/or "max" in svc.randRange() - make sure "min" is not bigger than "max"`);
    max++;

    let d = new Date().getTime();
    if (typeof performance !== "undefined" && typeof performance.now === "function")
        d += performance.now();
    
    let r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}
module.exports = randRange;
