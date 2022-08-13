const colors = {
    rst:   "\x1b[0m",
    fat:   "\x1b[37m",
    blink: "\x1b[5m",
    fg: {
        black:   "\x1b[30m",
        red:     "\x1b[31m",
        green:   "\x1b[32m",
        yellow:  "\x1b[33m",
        blue:    "\x1b[34m",
        magenta: "\x1b[35m",
        cyan:    "\x1b[36m",
        white:   "\x1b[37m",
        rst:     "\x1b[0m",
    },
    bg: {
        black:   "\x1b[40m",
        red:     "\x1b[41m",
        green:   "\x1b[42m",
        yellow:  "\x1b[43m",
        blue:    "\x1b[44m",
        magenta: "\x1b[45m",
        cyan:    "\x1b[46m",
        white:   "\x1b[47m",
        rst:     "\x1b[0m",
    }
}

function bright(cols)
{
    const retObj = {};
    Object.entries(cols).forEach(([k, v]) => {
        if(k !== "rst")
        retObj[k] = `${v}\x1b[1m`;
    });
    return retObj;
}

module.exports = {
    ...colors,
    fgb: bright(colors.fg),
    bgb: bright(colors.bg)
};
