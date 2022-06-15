// SvCoreLib by Sv443 - licensed under the MIT license: https://sv443.net/LICENSE
// For more information, please read the `README.md` file or go to https://github.com/Sv443-Network/SvCoreLib#readme

/**
 * @param {string} path
 * @returns {(...args: any) => any}
 */
const imp = (path) => require(`./src/${path}`);


module.exports = {
    //#SECTION functions

    isEmpty:          imp("functions/isEmpty"),
    isArrayEmpty:     imp("functions/isArrayEmpty"),
    error:            imp("functions/error"),
    allEqual:         imp("functions/allEqual"),
    allOfType:        imp("functions/allOfType"),
    reserialize:      imp("functions/reserialize"),
    readableArray:    imp("functions/readableArray"),
    mapRange:         imp("functions/mapRange"),
    unused:           imp("functions/unused"),
    replaceAt:        imp("functions/replaceAt"),
    byteLength:       imp("functions/byteLength"),
    randRange:        imp("functions/randRange"),
    randomizeArray:   imp("functions/randomizeArray"),
    randomItem:       imp("functions/randomItem"),
    removeDuplicates: imp("functions/removeDuplicates"),
    halves:           imp("functions/halves"),
    insertValues:     imp("functions/insertValues"),
    rng: {
        generateSeededNumbers: imp("functions/seededRNG/generateSeededNumbers"),
        generateRandomSeed:    imp("functions/seededRNG/generateRandomSeed"),
        validateSeed:          imp("functions/seededRNG/validateSeed"),
    },
    uuid: {
        hexadecimal:    imp("functions/generateUUID/hexadecimal"),
        decimal:        imp("functions/generateUUID/decimal"),
        alphanumerical: imp("functions/generateUUID/alphanumerical"),
        binary:         imp("functions/generateUUID/binary"),
        custom:         imp("functions/generateUUID/custom"),
    },
    http: {
        pipeFile:          imp("functions/http/pipeFile"),
        pipeString:        imp("functions/http/pipeString"),
        getClientEncoding: imp("functions/http/getClientEncoding"),
        ping:              imp("functions/http/ping"),
    },
    files: {
        readdirRecursive:     imp("functions/filesystem/readdirRecursive"),
        readdirRecursiveSync: imp("functions/filesystem/readdirRecursiveSync"),
        logger:               imp("functions/filesystem/logger"),
        downloadFile:         imp("functions/filesystem/downloadFile"),
        ensureDirs:           imp("functions/filesystem/ensureDirs"),
        ensureDirsSync:       imp("functions/filesystem/ensureDirsSync"),
        exists:               imp("functions/filesystem/exists"),
        existsSync:           imp("functions/filesystem/existsSync"),
    },
    sql: {
        sendQuery: imp("functions/sql/sendQuery"),
    },
    system: {
        usedHeap:       imp("functions/system/usedHeap"),
        inDebugger:     imp("functions/system/inDebugger"),
        softShutdown:   imp("functions/system/softShutdown"),
        noShutdown:     imp("functions/system/noShutdown"),
        yesShutdown:    imp("functions/system/yesShutdown"),
        setWindowTitle: imp("functions/system/setWindowTitle"),
    },
    pause: imp("functions/system/pause"),
    
    //#SECTION classes
    
    ProgressBar:   imp("classes/ProgressBar"),
    MenuPrompt:    imp("classes/MenuPrompt"),
    FolderDaemon:  imp("classes/FolderDaemon"),
    SelectionMenu: imp("classes/SelectionMenu"),
    StatePromise:  imp("classes/StatePromise"),

    // namespaced classes

    Errors: imp("classes/Errors"),

    //#SECTION objects

    info:   imp("objects/info"),
    colors: imp("objects/colors"),
};
