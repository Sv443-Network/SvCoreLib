/**
 * 🔹 Reads a folder asynchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array 🔹
 * @param {String} folder The folder that should be recursively read
 * @param {Function} callback The function that gets called after the folder has been read - has two arguments: error and result - you can also use the returned promise as a callback
 * @returns {Promise} Returns a Promise - resolution gets passed the result, rejection gets passed an error message
 * @async
 * @since 1.7.0
 * @version 1.9.2 Now this function also supports the Promise API
 */
function readdirRecursive(folder, callback) // refactored version of https://stackoverflow.com/a/5827895/8602926
{
    return new Promise((resolve, reject) => {
        let fs = require("fs");
        let path = require("path");
        let walk = (dir, done) => {
            let results = [];
            fs.readdir(dir, (err, list) => {
                if(err)
                    return done(err);
                let pending = list.length;
                if(!pending)
                    return done(null, results.reverse());
                list.forEach(file => {
                    file = path.resolve(dir, file);
                    fs.stat(file, (err, stat) => {
                        if(stat && stat.isDirectory())
                        {
                            walk(file, (err, res) => {
                                results = results.concat(res);
                                if(!--pending)
                                    done(null, results.reverse());
                            });
                        }
                        else
                        {
                            results.push(file);
                            if(!--pending)
                                done(null, results.reverse());
                        }
                    });
                });
            });
        };
        walk(folder, (err, result) => {
            callback(err, result);
            if(!err)
                return resolve(result);
            else return reject(err);
        });
    });
}
module.exports = readdirRecursive;
