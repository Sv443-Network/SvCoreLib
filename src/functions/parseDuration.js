function parseDuration(millis)
{
    millis = parseInt(millis);
    if(typeof millis !== "number" || isNaN(millis) || millis < 0)
        throw new TypeError("Parameter \"millis\" has to be a number that's 0 or higher");

    let ms = parseInt(millis);
    let secs = Math.floor(ms / 1000);
    ms -= secs * 1000;
    let hrs = Math.floor(secs / 3600);
    secs -= hrs * 3600;
    let days = Math.floor(hrs / 24);
    hrs -= days * 24;
    let mins = Math.floor(secs / 60);
    secs -= mins * 60;

    return { days, hrs, mins, secs, ms };
}

module.exports = parseDuration;
