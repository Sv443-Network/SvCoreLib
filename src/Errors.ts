// This file contains all of SCL's custom error classes

/**
 * Base class for all SCL Error classes.  
 * Adds a `date` property that tracks the exact datetime an error was created / thrown.
 */
class SCLError extends Error {
  public readonly date: Date;
  constructor(message: string, ...params: any[]) {
    // @ts-ignore
    super(message, ...params);
    this.date = new Date();
  }
}





class InvalidPathError extends SCLError {
  constructor(message: string, ...params: any[]) {
    super(message, ...params);
    this.name = "Invalid Path Error";

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, InvalidPathError);
  }
}

class NotAFolderError extends SCLError {
  constructor(message: string, ...params: any[]) {
    super(message, ...params);
    this.name = "Not A Folder Error";

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, NotAFolderError);
  }
}

class PatternInvalidError extends SCLError {
  constructor(message: string, ...params: any[]) {
    super(message, ...params);
    this.name = "Pattern Invalid Error";

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, PatternInvalidError);
  }
}

class NoStdinError extends SCLError {
  constructor(message: string, ...params: any[]) {
    super(message, ...params);
    this.name = "Error: Terminal can't be read from";

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, NoStdinError);
  }
}

class InvalidMimeTypeError extends SCLError {
  constructor(message: string, ...params: any[]) {
    super(message, ...params);
    this.name = "Invalid MIME Type";

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, InvalidMimeTypeError);
  }
}

class SqlConnectionNotEstablishedError extends SCLError {
  constructor(message: string, ...params: any[]) {
    super(message, ...params);
    this.name = "SQL connection was not established";

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, SqlConnectionNotEstablishedError);
  }
}


export const Errors = {
  SCLError,
  InvalidPathError,
  NotAFolderError,
  PatternInvalidError,
  NoStdinError,
  InvalidMimeTypeError,
  SqlConnectionNotEstablishedError
};
