/**
 * 🔹 Reads a folder synchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array 🔹
 * @param {String} folder The folder that should be recursively read
 * @returns {Array<String>}
 * @since 1.7.0
 * @version 1.8.0 Now the paths are being resolved as absolute, not relative + fixed JSDoc return type
 */
function readdirRecursiveSync(folder) { // from https://stackoverflow.com/a/16684530/8602926
    let fs = require("fs");
    let path = require("path");

    let walk = function(dir) {
        let results = [];
        let list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory())
                results = results.concat(walk(file));
            else
                results.push(path.resolve(file));
        });
        return results;
    }
    return walk(folder);
}
module.exports = readdirRecursiveSync;