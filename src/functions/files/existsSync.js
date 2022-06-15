const { pathExistsSync } = require("fs-extra");
const { resolve } = require("path");


function exists(path)
{
    try
    {
        return pathExistsSync(resolve(path));
    }
    catch(_e)
    {
        return false;
    }
}

module.exports = exists;
