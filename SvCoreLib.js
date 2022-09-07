// SvCoreLib by Sv443 - licensed under the MIT license: https://sv443.net/LICENSE
// For more information, please read the `README.md` file or go to https://github.com/Sv443-Network/SvCoreLib#readme

module.exports = {
    //#SECTION functions

    isEmpty:          require("functions/isEmpty"),
    isArrayEmpty:     require("functions/isArrayEmpty"),
    isClass:          require("functions/isClass"),
    error:            require("functions/error"),
    allEqual:         require("functions/allEqual"),
    allOfType:        require("functions/allOfType"),
    allInstanceOf:    require("functions/allInstanceOf"),
    reserialize:      require("functions/reserialize"),
    readableArray:    require("functions/readableArray"),
    mapRange:         require("functions/mapRange"),
    unused:           require("functions/unused"),
    replaceAt:        require("functions/replaceAt"),
    byteLength:       require("functions/byteLength"),
    randRange:        require("functions/randRange"),
    clamp:            require("functions/clamp"),
    randomizeArray:   require("functions/randomizeArray"),
    randomItem:       require("functions/randomItem"),
    randomItemIndex:  require("functions/randomItemIndex"),
    takeRandomItem:   require("functions/takeRandomItem"),
    removeDuplicates: require("functions/removeDuplicates"),
    halves:           require("functions/halves"),
    insertValues:     require("functions/insertValues"),
    formatDuration:   require("functions/formatDuration"),
    parseDuration:    require("functions/parseDuration"),

    // namespaces
    seededRNG: {
        randomSeed:      require("functions/seededRNG/randomSeed"),
        generateNumbers: require("functions/seededRNG/generateNumbers"),
        validateSeed:    require("functions/seededRNG/validateSeed"),
    },
    uuid: {
        hexadecimal:    require("functions/uuid/hexadecimal"),
        decimal:        require("functions/uuid/decimal"),
        alphanumerical: require("functions/uuid/alphanumerical"),
        binary:         require("functions/uuid/binary"),
        custom:         require("functions/uuid/custom"),
    },
    http: {
        pipeFile:          require("functions/http/pipeFile"),
        pipeString:        require("functions/http/pipeString"),
        getClientEncoding: require("functions/http/getClientEncoding"),
        ping:              require("functions/http/ping"),
    },
    files: {
        readdirRecursive:     require("functions/files/readdirRecursive"),
        readdirRecursiveSync: require("functions/files/readdirRecursiveSync"),
        logger:               require("functions/files/logger"),
        downloadFile:         require("functions/files/downloadFile"),
        ensureDirs:           require("functions/files/ensureDirs"),
        ensureDirsSync:       require("functions/files/ensureDirsSync"),
        exists:               require("functions/files/exists"),
        existsSync:           require("functions/files/existsSync"),
    },
    sql: {
        sendQuery: require("functions/sql/sendQuery"),
    },
    system: {
        usedHeap:       require("functions/system/usedHeap"),
        inDebugger:     require("functions/system/inDebugger"),
        softShutdown:   require("functions/system/softShutdown"),
        noShutdown:     require("functions/system/noShutdown"),
        yesShutdown:    require("functions/system/yesShutdown"),
        setWindowTitle: require("functions/system/setWindowTitle"),
        pause:          require("functions/system/pause"),
    },

    //#SECTION classes

    ProgressBar:   require("classes/ProgressBar"),
    MenuPrompt:    require("classes/MenuPrompt"),
    FolderDaemon:  require("classes/FolderDaemon"),
    SelectionMenu: require("classes/SelectionMenu"),
    StatePromise:  require("classes/StatePromise"),

    // namespaced classes

    Errors: require("classes/Errors"),

    //#SECTION objects

    info:   require("objects/info"),
    colors: require("objects/colors"),
};
