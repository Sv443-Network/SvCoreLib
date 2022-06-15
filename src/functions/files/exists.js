const { pathExists } = require("fs-extra");
const { resolve } = require("path");


async function exists(path)
{
    try
    {
        return await pathExists(resolve(path));
    }
    catch(_e)
    {
        return false;
    }
}

module.exports = exists;
