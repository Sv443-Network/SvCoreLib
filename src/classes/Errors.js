// This file contains all of SCL's custom error classes

class InvalidPathError extends Error
{
    constructor(message, ...params)
    {
        super(message, ...params);
        this.name = "Invalid Path Error";
        this.date = new Date();

        if(Error.captureStackTrace)
            Error.captureStackTrace(this, InvalidPathError);
    }
}

class NotAFolderError extends Error
{
    constructor(message, ...params)
    {
        super(message, ...params);
        this.name = "Not A Folder Error";
        this.date = new Date();

        if(Error.captureStackTrace)
            Error.captureStackTrace(this, NotAFolderError);
    }
}

class PatternInvalidError extends Error
{
    constructor(message, ...params)
    {
        super(message, ...params);
        this.name = "Pattern Invalid Error";
        this.date = new Date();

        if(Error.captureStackTrace)
            Error.captureStackTrace(this, PatternInvalidError);
    }
}

class NoStdinError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "Error: Terminal can't be read from";
        this.date = new Date();

        if(Error.captureStackTrace)
            Error.captureStackTrace(this, NoStdinError);
    }
}

class InvalidMimeTypeError extends Error {
    constructor(message)
    {
        super(message);
        this.name = "Invalid MIME Type";
        this.date = new Date();

        if(Error.captureStackTrace)
            Error.captureStackTrace(this, InvalidMimeTypeError);
    }
}


module.exports = {
    InvalidPathError,
    NotAFolderError,
    PatternInvalidError,
    NoStdinError,
    InvalidMimeTypeError
};
