/**
 * 🔹 Reserializes a JSON-compatible object. This means it copies the value of an object and loses the internal reference to it.  
 * Using an object that contains special JavaScript classes or a circular structure will result in unexpected behavior. 🔹
 * @param {Object} obj The object you want to reserialize - if this is not of type `object`, you will just get the original value back
 * @param {Boolean} [immutable] Set this to `true` if you want to make the returned object immutable (its properties can't be modified)
 * @returns {Object} Returns the reserialized object or the original value if it is not of type `object`
 * @since 1.10.0
 */
function reserialize(obj, immutable)
{
    if(typeof obj != "object")
        return obj;

    try
    {
        let reserialized = JSON.parse(JSON.stringify(obj));

        if(immutable === true)
            return Object.freeze(reserialized);

        return reserialized;
    }
    catch(err)
    {
        return obj;
    }
}

module.exports = reserialize;
