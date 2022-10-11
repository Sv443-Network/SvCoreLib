// SvCoreLib by Sv443 - licensed under the MIT license: https://sv443.net/LICENSE
// For more information, please read the `README.md` file or go to https://github.com/Sv443-Network/SvCoreLib#readme

module.exports = {
    //#SECTION functions

    isEmpty:                require("./src/functions/isEmpty"),
    isArrayEmpty:           require("./src/functions/isArrayEmpty"),
    isClass:                require("./src/functions/isClass"),
    error:                  require("./src/functions/error"),
    allEqual:               require("./src/functions/allEqual"),
    allOfType:              require("./src/functions/allOfType"),
    allInstanceOf:          require("./src/functions/allInstanceOf"),
    reserialize:            require("./src/functions/reserialize"),
    readableArray:          require("./src/functions/readableArray"),
    mapRange:               require("./src/functions/mapRange"),
    unused:                 require("./src/functions/unused"),
    replaceAt:              require("./src/functions/replaceAt"),
    byteLength:             require("./src/functions/byteLength"),
    randRange:              require("./src/functions/randRange"),
    clamp:                  require("./src/functions/clamp"),
    randomizeArray:         require("./src/functions/randomizeArray"),
    randomItem:             require("./src/functions/randomItem"),
    randomItemIndex:        require("./src/functions/randomItemIndex"),
    takeRandomItem:         require("./src/functions/takeRandomItem"),
    removeDuplicates:       require("./src/functions/removeDuplicates"),
    halves:                 require("./src/functions/halves"),
    insertValues:           require("./src/functions/insertValues"),
    formatDuration:         require("./src/functions/formatDuration"),
    parseDuration:          require("./src/functions/parseDuration"),
    splitIntoParts:         require("./src/functions/splitIntoParts"),
    splitIntoPartsOfLength: require("./src/functions/splitIntoPartsOfLength"),

    // namespaces
    seededRNG: {
        randomSeed:      require("./src/functions/seededRNG/randomSeed"),
        generateNumbers: require("./src/functions/seededRNG/generateNumbers"),
        validateSeed:    require("./src/functions/seededRNG/validateSeed"),
    },
    uuid: {
        hexadecimal:    require("./src/functions/uuid/hexadecimal"),
        decimal:        require("./src/functions/uuid/decimal"),
        alphanumerical: require("./src/functions/uuid/alphanumerical"),
        binary:         require("./src/functions/uuid/binary"),
        custom:         require("./src/functions/uuid/custom"),
    },
    http: {
        pipeFile:          require("./src/functions/http/pipeFile"),
        pipeString:        require("./src/functions/http/pipeString"),
        getClientEncoding: require("./src/functions/http/getClientEncoding"),
        ping:              require("./src/functions/http/ping"),
    },
    files: {
        readdirRecursive:     require("./src/functions/files/readdirRecursive"),
        readdirRecursiveSync: require("./src/functions/files/readdirRecursiveSync"),
        logger:               require("./src/functions/files/logger"),
        downloadFile:         require("./src/functions/files/downloadFile"),
        ensureDirs:           require("./src/functions/files/ensureDirs"),
        ensureDirsSync:       require("./src/functions/files/ensureDirsSync"),
        exists:               require("./src/functions/files/exists"),
        existsSync:           require("./src/functions/files/existsSync"),
    },
    sql: {
        sendQuery: require("./src/functions/sql/sendQuery"),
    },
    system: {
        usedHeap:       require("./src/functions/system/usedHeap"),
        inDebugger:     require("./src/functions/system/inDebugger"),
        softShutdown:   require("./src/functions/system/softShutdown"),
        noShutdown:     require("./src/functions/system/noShutdown"),
        yesShutdown:    require("./src/functions/system/yesShutdown"),
        setWindowTitle: require("./src/functions/system/setWindowTitle"),
        pause:          require("./src/functions/system/pause"),
    },

    //#SECTION classes

    ProgressBar:   require("./src/classes/ProgressBar"),
    MenuPrompt:    require("./src/classes/MenuPrompt"),
    FolderDaemon:  require("./src/classes/FolderDaemon"),
    SelectionMenu: require("./src/classes/SelectionMenu"),
    StatePromise:  require("./src/classes/StatePromise"),

    // namespaced classes

    Errors: require("./src/classes/Errors"),

    //#SECTION objects

    info:   require("./src/objects/info"),
    colors: require("./src/objects/colors"),
};
