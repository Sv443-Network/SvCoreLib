function isClass(val)
{
    try
    {
        return typeof val === "function" && !Object.getOwnPropertyDescriptor(val, "prototype").writable;
    }
    catch(err)
    {
        return false;
    }
}

module.exports = isClass;
