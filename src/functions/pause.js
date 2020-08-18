/**
 * 🔹 Waits for the user to press a key and then resolves a Promise 🔹
 * @param {String} text The text to display - if left empty this defaults to "Press any key to continue..."
 * @returns {Promise<String>} Passes the pressed key in the resolution or the error message in the rejection
 * @since 1.9.0
 * @version 1.9.3 Events are now being correctly unregistered
 */
function pause(text)
{
    if(!text || typeof text !== "string")
        text = "Press any key to continue...";

    if(!process.stdin.isRaw)
        process.stdin.setRawMode(true);

    return new Promise((resolve, reject) => {
        process.stdout.write(`${text} `);
        process.stdin.resume();

        let onData = chunk => {
            if(/\u0003/gu.test(chunk)) // eslint-disable-line no-control-regex
                process.exit(0);

            process.stdout.write("\n");
            process.stdin.pause();

            process.stdin.removeListener("data", onData);
            process.stdin.removeListener("error", onError);

            return resolve(chunk.toString());
        }

        let onError = err => {
            process.stdin.removeListener("data", onData);
            process.stdin.removeListener("error", onError);

            return reject(err);
        }

        process.stdin.on("data", onData);
        process.stdin.on("error", onError);
    });
}
module.exports = pause;
