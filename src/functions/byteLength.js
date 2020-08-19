/**
 * 🔹 Returns the length of a string in bytes.
 * Passing anything other than a string will return `0` 🔹
 * @param {String} str
 * @returns {Number}
 * @since 1.10.0
 */
function byteLength(str)
{
    if(!str || typeof str != "string")
        return 0;

    return Buffer.byteLength(str, "utf8");
}

module.exports = byteLength;
