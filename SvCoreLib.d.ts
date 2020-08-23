import * as _http from 'http';

//#MARKER functions
//#SECTION miscellaneous

/**
 * 🔹 Returns true, if the input is undefined, null, an empty string, an empty array or an object with length = 0.  
 * Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed! 🔹
 * @param input Variable that should be checked - this can be of any type but the basic types will work best
 * @returns true or false
 * @since 1.4.0
 * @version 1.6.5 lowercase alias svc.isempty was removed
 * @version 1.8.0 Added check for objects with length = 0
 */
export function isEmpty(input: any): boolean;

/**
 * 🔹 Checks how many values of the array are empty (does the same check as `svc.isEmpty()`, but on each array item) 🔹
 * @param array Array that should be checked
 * @returns true if all are empty, false if none are empty and number if only some are empty
 * @throws Throws an error if the parameter isn't an array
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of returning string
 */
export function isArrayEmpty(array: any[]): boolean | number;

/**
 * 🔹 Sends a red console message and optionally exits the process with an optional status code. 🔹
 * @param cause The cause of the error
 * @param log_file_path if the error message should automatically be logged to the file with the specified path. undefined or null to disable.
 * @param shutdown if the process should be exited or not
 * @param status with which status code the process should be exited
 * @param consoleMsg whether to show a red message in the console or not
 * @throws Throws an error if the "cause" parameter isn't a string
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of logging to console and returning undefined
 */
export function error(cause: string, log_file_path?: string, shutdown?: boolean, status?: number, consoleMsg?: boolean): void;

/**
 * 🔹 Tests an array and returns true if all values are equal. 🔹
 * @param array The array you want to test
 * @param loose Set to `true` to use loose equality comparison instead of strict equality comparison. Defaults to `false`
 * @returns true if all values are equal, false if not
 * @throws Throws an error if the parameter is not an array
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of returning string
 */
export function allEqual(array: any[], loose?: boolean): boolean;

/**
 * 🔹 Executes a synchronous function before the process gets shut down (on SIGINT or SIGTERM).  
 * This can be used to close files, abort connections or just to print a console message before shutdown. 🔹  
 * - ⚠️ Asynchronous function execution is not supported (yet)  
 * - ⚠️ If `svc.noShutdown()` was used, the passed function will be executed, but the process will not exit
 * @param funct This function will get executed before process shutdown
 * @param code The exit code with which the process should be closed. Defaults to 0
 * @since 1.5.0
 * @version 1.8.0 Added "code" parameter to specify an exit code
 * @version 1.9.0 Function will now still be called when `svc.noShutdown()` was used
 * @version 1.9.4 Removed signal SIGKILL because it caused crashes on Linux
 */
export function softShutdown(funct: (any) => any, code?: number): void;

/**
 * 🔹 Prevents the script from shutting down with default commands (CTRL + C).
 * It has to either be killed with the task manager or internally, through the script (using `process.exit()`) 🔹
 * @since 1.5.0
 */
export function noShutdown(): void;

/**
 * 🔹 Removes the script shut down prevention that was previously enabled with noShutdown() 🔹
 * (Sorry for the name, I saw an opportunity and I took it, don't judge me)
 * @since 1.6.0
 */
export function yesShutdown(): void;

/**
 * 🔹 Reserializes a JSON-compatible object. This means it copies the value of an object and loses the internal reference to it.  
 * Using an object that contains special JavaScript classes or a circular structure will result in unexpected behavior. 🔹
 * @param obj The object you want to reserialize - if this is not of type `object`, you will just get the original value back
 * @param immutable Set this to `true` if you want to make the returned object immutable (its properties can't be modified)
 * @returns Returns the reserialized object or the original value if it is not of type `object`
 * @since 1.10.0
 */
export function reserialize(obj: object, immutable?: boolean): object;

/**
 * 🔹 Converts an array to a better readable one 🔹
 * @param array The array you want to make readable
 * @param separators The default separator for all values except the last one. Defaults to ", " if left empty. Add whitespaces if needed!
 * @param lastSeparator The last separator. Defaults to " and " if empty. Add whitespaces if needed!
 * @returns Better readable array as string
 * @since 1.7.0
 */
export function readableArray(array: any[], separators?: string, lastSeparator?: string): string;

/**
 * 🔹 Transforms the `value` parameter from the numerical range [`range_1_min`-`range_1_max`] to the numerical range [`range_2_min`-`range_2_max`] 🔹
 * @param value The value from the first numerical range, that you want to transform to a value inside the second numerical range
 * @param range_1_min The lowest possible value of the first numerical range
 * @param range_1_max The highest possible value of the first numerical range
 * @param range_2_min The lowest possible value of the second numerical range
 * @param range_2_max The highest possible value of the second numerical range
 * @returns Floating point number of `value` inside the second numerical range
 * @throws Throws an error if the arguments are not of type `Number` or the `*_max` argument(s) is/are equal to 0
 * @since 1.8.0
 */
export function mapRange(value: number, range_1_min: number, range_1_max: number, range_2_min: number, range_2_max: number): number;

/**
 * 🔹 Use this if you are using a linter that complains about unused vars.  
 * As this function basically does nothing, you can even leave it in once the variable is used again and nothing will break. 🔹
 * @param any Any variable(s) of any type
 * @since 1.8.0
 * @version 1.9.0 Function now accepts an infinite number of parameters
 */
export function unused(...any: any): void;

/**
 * 🔹 Replaces a character from the specified `string` at the specified `index` with the value of `replacement` 🔹
 * @param input The input string
 * @param index The zero-based index of the char you want to replace
 * @param replacement What you want the char to be replaced with
 * @since 1.8.0
 */
export function replaceAt(input: string, index: number, replacement: string): string;

/**
 * 🔹 Waits for the user to press a key and then resolves a Promise 🔹
 * @param text The text to display - if left empty this defaults to "Press any key to continue..."
 * @returns Passes the pressed key in the resolution or the error message in the rejection
 * @since 1.9.0
 * @version 1.9.3 Events are now being correctly unregistered
 */
export function pause(text?: string): Promise<string>;

/**
 * 🔹 Checks if the process is currently running in the debugger environment.  
 * This can be useful because some features like child processes and reading from stdin do not work in certain debuggers.  
 * Should support all major debuggers. 🔹
 * @returns true, if the process is currently running in a debugger, false if not.
 * @since 1.9.0
 */
export function inDebugger(): boolean;

/**
 * 🔹 Returns the length of a string in bytes.  
 * Passing anything other than a string will return `0` 🔹
 * @param str
 * @since 1.10.0
 */
export function byteLength(str: string): number;

//#SECTION randomization

/**
 * 🔹 Highly random number generator with upper and lower boundary.  
 * `Highly random` means that contrary to `Math.random()` which uses a seed, this RNG additionally uses a timestamp to calculate the number, making it much more random. 🔹  
 * ⚠️ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function! If you know how to implement that, feel free to submit a pull request :) ⚠️
 * @param min Lower boundary of the RNG
 * @param max Upper boundary of the RNG
 * @throws Throws an error if the arguments are not of type 'Number'
 * @since 1.5.0
 */
export function randRange(min: number, max: number): number;

/**
 * 🔹 Randomizes all items in an array and returns it 🔹
 * @param array The array that should be randomized
 * @returns Returns the randomized array
 * @throws Throws an error if the parameter is not an array
 * @since 1.8.0
 */
export function randomizeArray(array: any[]): any[];

/**
 * 🔹 Chooses a random item in an array and returns it 🔹
 * @param array An array of any size, with any values contained inside
 * @returns Returns a random item of the provided array
 * @since 1.9.4
 */
export function randomItem(array: any[]): any;

/**
 * 🔹 Removes duplicate items in an array 🔹
 * @param array An array with any values
 * @since 1.9.0
 */
export function removeDuplicates(array: any[]): any[];

/**
 * 🔸 Offers a few functions to generate seeded random numbers.  
 * This means using the same input seed, you will always get the same output number, just like you get the same Minecraft world when using the same seed twice. 🔸
 */
declare namespace seededRNG {
    export interface SeededRandomNumbers {
        /** An array of the random numbers */
        numbers: number[];
        /** The random numbers, but as a string */
        stringified: string;
        /** The random numbers, but as an integer */
        integer: number;
        /** The seed that was used to create the random numbers */
        seed: number;
    }
    
    /**
     * 🔹 Generates random numbers from the numerical range [0-9] based on a seed.  
     * To make sure the seed is valid, you can use the function `validateSeed()`. 🔹
     * @param count How many random numbers should be generated - will default to 16 if left empty
     * @param seed The seed to generate numbers from. Leave empty to use a random default seed. The used seed will be included in the returned object
     * @returns An object containing the seed and the random number in three different formats
     * @since 1.8.0
     */
    export function generateSeededNumbers(count?: number, seed?: number | string): SeededRandomNumbers;
    
    /**
     * 🔹 Creates a random seed 🔹
     * @param digitCount How many digits the seed should have - defaults to 10 if left empty
     * @since 1.8.0
     */
    export function generateRandomSeed(digitCount?: number): number;
    
    /**
     * 🔹 Validates a seed to be used in `generateSeededNumbers()` 🔹
     * @param seed The seed to validate
     * @since 1.8.0
     */
    export function validateSeed(seed: number | string): boolean;
}

/**
 * 🔸 Offers many functions to generate Universally Unique Identifiers (UUIDs) 🔸
 */
declare namespace generateUUID {
    /**
     * 🔹 Creates an alphanumerical [0-9,A-Z] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
     * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
     * @param upperCase Set to true to have all letters in upper case, false for lower case
     * @since 1.8.0
     */
    export function alphanumerical(uuidFormat: string, upperCase?: boolean): string;
    
    /**
     * 🔹 Creates a binary [0-1] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
     * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
     * @param asBooleanArray Set to true to get an array of booleans instead of a string of 1 and 0. Setting this to true will ignore the uuidFormat parameter. Instead, the amount of x's and y's will be equivalent to the resulting array items.
     * @since 1.8.0
     */
    export function binary(uuidFormat: string, asBooleanArray?: boolean): string | boolean[];
    
    /**
     * 🔹 Creates a custom UUID with a given format from a list of characters specified by the possibleValues parameter. This uses a RNG that is even more random than the standard Math.random() 🔹
     * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
     * @param possibleValues A string containing all characters that should be injected into the final UUID - (delimited by nothing) - Example: "ABCDEF01234$%&#"
     * @since 1.8.0
     */
    export function custom(uuidFormat: string, possibleValues: string): string;
    
    /**
     * 🔹 Creates a decimal [0-9] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
     * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
     * @since 1.8.0
     */
    export function decimal(uuidFormat: string): string;
    
    /**
     * 🔹 Creates a hexadecimal [0-9,A-F] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
     * @param uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
     * @param upperCase Set to true to have all letters in upper case, false for lower case
     * @since 1.5.0
     * @version 1.8.0 Renamed the function and moved it
     */
    export function hexadecimal(uuidFormat: string, upperCase?: boolean): string;
}

//#SECTION http

/**
 * 🔸 Offers a few functions that work in conjunction with Node's builtin `http` and `https` modules 🔸
 */
declare namespace http {
    /** The encoding's identifier / name */
    export type EncodingName = "br" | "gzip" | "deflate" | "compress" | "identity";

    /**
     * 🔹 Pipes a file into a HTTP response. This is a tiny bit faster and much more efficient than loading the file into RAM first. 🔹
     * @param res The HTTP res object
     * @param filePath Path to the file to respond with - relative to the project root directory
     * @param mimeType The MIME type to respond with - defaults to "text/plain" if left empty
     * @param statusCode The status code to respond with - defaults to 200
     * @returns Returns `null` if there was no error or a string containing the error message
     * @throws Throws an "InvalidMimeTypeError" if the provided "mimeType" parameter is not a valid MIME type
     */
    export function pipeFile(res: _http.ServerResponse, filePath: string, mimeType?: string, statusCode?: number): null | string;
    
    /**
     * 🔹 Pipes a string into a HTTP response. This is a tiny bit faster and much more efficient than loading the string into RAM first. 🔹
     * @param res The HTTP res object
     * @param text The response body
     * @param mimeType The MIME type to respond with - defaults to "text/plain" if left empty
     * @param statusCode The status code to respond with - defaults to 200
     * @returns Returns `null` if there was no error or a string containing the error message
     * @throws Throws an "InvalidMimeTypeError" if the provided "mimeType" parameter is not a valid MIME type
     */
    export function pipeString(res: _http.ServerResponse, text: string, mimeType?: string, statusCode?: number): null | string;
    
    /**
     * 🔹 Returns the name of the client's accepted encoding.  
     * If the client supports multiple encodings, returns the most efficient and modern encoding.  
     * For more information, visit the [MDN documentation page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding) 🔹
     * @param req The HTTP `req` object
     * @returns Returns "identity" if no encodings are supported, else returns the encoding's name
     * @since 1.10.0
     */
    export function getClientEncoding(req: _http.IncomingMessage): EncodingName;
}

//#SECTION networking

/**
 * This object contains the return values of a ping
 */
export interface PingReturnValues {
    /** The ping's returned status code (eg. 200 or 404) */
    statusCode: number;
    /** The status message of the ping - Could be something like "Ok" for status 200 or "Not Found" for status 404 */
    statusMessage: string;
    /** The response time in milliseconds as an integer */
    responseTime: number;
    /** The `content-type` header - this will contain the MIME type and the content encoding */
    contentType: string;
}

/**
 * 🔹 Pings the specified URL and returns the status code 🔹
 * @param url The URL that should be pinged
 * @param timeout time in milliseconds after which the ping will time out and return a 404 error - defaults to 5000 ms
 * @returns Promise gets passed the HTTP status code (for example 200 or 404), the status message and the response duration in ms; if errored returns a string with the error message
 * @throws Throws an error if the `url` parameter is not present or malformatted
 * @since 1.6.0
 * @version 1.6.1 changed attributes
 * @version 1.6.5 changed time measurement dependency due to deprecation
 * @version 1.6.6 updated documentation for the resulting object
 * @version 1.8.0 changed time measurement method to be a much more accurate one
 */
export function ping(url: string, timeout?: number): Promise<PingReturnValues>;

export interface DownloadProgress {
    /** The current download progress in bytes */
    currentB: number;
    /** The current download progress in kilobytes */
    currentKB: number;
    /** The current download progress in megabytes */
    currentMB: number;
    /** The total file size in bytes */
    totalB: number;
    /** The total file size in kilobytes */
    totalKB: number;
    /** The total file size in megabytes */
    totalMB: number;
}

export interface ProgressCallback {
    /** This object contains the current progress of the download */
    DownloadProgress: DownloadProgress;
}

export interface FinishedCallback {
    /** This parameter is null if no error was encountered, or contains a string if an error was encountered */
    error: string | undefined;
}

export interface DownloadOptions {
    /** The name that the downloaded file should be saved as, including the file extension - for example: "image.png" or "archive.zip" - defaults to "download.txt" */
    fileName: string;
    /** A callback function that gets called every 50 milliseconds that gets passed an object containing info on the download progress - sometimes the download progress can't be gotten so this callback won't contain the total size or will not be called a final time on finish. This behavior is normal. */
    progressCallback: ProgressCallback;
    /** A callback function that gets called when the download finished and gets passed a parameter that is `null` if no error was encountered, or contains a string if an error was encountered */
    finishedCallback: FinishedCallback;
}

/**
 * Downloads a file from the specified URL, to the specified destination path, according to the specified options
 * @param url The URL to the file you want to download
 * @param destPath The path where the file should be saved to - can be absolute or relative - If left empty, it will default to the root directory of the project - **⚠️ Do not include the file name here - set it in the `options` parameter ⚠️**
 * @param options
 * @returns Promise that resolves to a void value and rejects to an error string
 * @since 1.8.0
 * @version 1.9.2 Added the option of using the Promise API instead of a callback
 */
export function downloadFile(url: string, destPath?: string, options?: DownloadOptions): Promise<string | void>;

//#SECTION file system

/**
 * 🔸 Offers a few functions to interface with the file system 🔸
 */
declare namespace filesystem {
    export interface LoggerOptions {
        /** Set to true to append content to the bottom of a file, false to just override the file's contents */
        append_bottom: boolean;
        /** Set to true to add a timestamp to the logged content */
        timestamp: boolean;
    }

    /**
     * 🔹 Logs a string to a specified log file 🔹
     * @param path Relative path to the log file
     * @param content Content that should be written to the log file
     * @param options Additional options
     * @throws Throws an error if the parameters are of the wrong type or not present
     * @since 1.5.0
     */
    export function logger(path: string, content: string, options?: LoggerOptions): void;

    /**
     * 🔹 Reads a folder asynchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array 🔹
     * @param folder The folder that should be recursively read
     * @param callback The function that gets called after the folder has been read - has two arguments: error and result - you can also use the returned promise as a callback
     * @returns Returns a Promise - resolution gets passed the result, rejection gets passed an error message
     * @async
     * @since 1.7.0
     * @version 1.9.2 Now this function also supports the Promise API
     */
    export function readdirRecursive(folder: string, callback?: (result: string[]) => void): Promise<string[]>;

    /**
     * 🔹 Reads a folder synchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback 🔹  
     * ⚠️ Warning! Large amounts of files (like letting it run on a directory like "C:/Windows") can freeze the process completely or exceed the maximum possible index of a JS array - instead use `readdirRecursive()` if possible
     * @param folder The folder that should be recursively read
     * @returns an array of strings containing absolute paths to all found files
     * @since 1.7.0
     * @version 1.8.0 Now the paths are being resolved as absolute, not relative + fixed JSDoc return type
     */
    export function readdirRecursiveSync(folder: string): string[];
}

//#MARKER classes

/**
 * Creates a dynamic progress bar in the CLI  
 *   
 * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**  
 *   
 * Example:  
 * ![ProgressBar example image](https://sv443.net/cdn/jsl/doc/progress_bar_small.png)
 */
export class ProgressBar {
    /**
     * 🔹 Creates a dynamic progress bar with a percentage and custom message display 🔹  
     *   
     * ![ProgressBar example image](https://sv443.net/cdn/jsl/doc/progress_bar_small.png)
     * @param timesToUpdate How many times you will call ProgressBar.next() in total - example: 4 means you will need to call ProgressBar.next() exactly four times to reach 100% progress 
     * @param initialMessage Initial message that appears at 0% progress - omit parameter to not have an initial message
     * @constructor
     * @since 1.7.0
     */
    constructor(timesToUpdate: number, initialMessage?: string);

    /**
     * 🔹 Increment the progress bar. The amount of these functions should be known at the point of initially creating the ProgressBar object. 🔹
     * @param message Message that should be displayed
     * @since 1.7.0
     */
    next(message?: string): void;
    
    /**
     * 🔹 Executes a function once the progress reaches 100% 🔹
     * @param callback Function
     * @throws Throws an error if the "callback" argument is not a function
     * @since 1.7.0
     */
    onFinish(callback: () => void): void;
    
    /**
     * 🔹 Get the current progress as a float value 🔹
     * @since 1.7.0
     */
    getProgress(): number;
    
    /**
     * 🔹 Get the amount of increments that are still needed to reach 100% progress aka how many times you need to call the `next()` method 🔹
     * @returns {Number}
     * @since 1.7.0
     */
    getRemainingIncrements(): number;
}

/** An option of a menu of the menu prompt */
export interface MenuPromptMenuOption {
    /** The key(s) that need(s) to be pressed to select this option */
    key: string;
    /** The description of this option */
    description: string;
}

/** A single menu of the menu prompt */
export interface MenuPromptMenu {
    /** The title of this menu */
    title: string;
    /** An array of options for this menu */
    options: MenuPromptMenuOption[];
}

/** The result of a single menu of a menu prompt */
export interface MenuPromptResult {
    /** The key of the selected option */
    key: string;
    /** The description of the selected option */
    description: string;
    /** The title of the menu */
    menuTitle: string;
    /** The zero-based index of the selected option */
    optionIndex: number;
    /** The zero-based index of the menu */
    menuIndex: number;
}

/** A callback that gets executed once the MenuPrompt has finished */
export interface MenuPromptOnFinishedCallback {
    /** The results of the MenuPrompt (an array containing objects) - will be an empty array if there aren't any results */
    results: MenuPromptResult[];
}

/** The options of the menu prompt */
export interface MenuPromptOptions {
    /** The key or keys that need to be entered to exit the prompt */
    exitKey: string;
    /** The separator character(s) between the option key and the option description */
    optionSeparator: string;
    /** Character(s) that should be prefixed to the cursor. Will default to this arrow: "─►" */
    cursorPrefix: string;
    /** Whether the menu should be retried if the user entered a wrong option - if false, continues to next menu */
    retryOnInvalid: boolean;
    /** A function that gets called when the user is done with all of the menus of the prompt or entered the exit key(s). The only passed parameter is an array containing all selected option keys */
    onFinished: MenuPromptOnFinishedCallback;
    /** If set to true, the MenuPrompt will only accept a single character of input and will then automatically submit the value. If set to false, the user will have to explicitly press the Enter key to submit a value */
    autoSubmit: boolean;
}

/** Used for translating a menu prompt */
export interface MenuPromptLocalization {
    /** The text that's displayed when a wrong key was pressed */
    wrongOption: string;
    /** A different text that's displayed when a wrong key was pressed */
    invalidOptionSelected: string;
    /** The name of the exit option */
    exitOptionText: string;
}

/**
 * Creates an interactive prompt in the CLI with one or more menus  
 *   
 * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**  
 *   
 * Example:  
 * ![MenuPrompt example image](https://sv443.net/cdn/jsl/doc/menu_prompt_small.png)
 */
export class MenuPrompt {
    /**
     * 🔹 Creates an interactive prompt with one or many menus - add them using `MenuPrompt.addMenu()`.  
     * To translate the messages, you can use the `MenuPrompt.localization` object, which is where all localization variables are stored. 🔹  
     * ⚠️ Warning: After creating a MenuPrompt object, the process will no longer exit automatically until the MenuPrompt has finished or was explicitly closed. You have to explicitly use process.exit() until the menu has finished or is closed  
     *   
     * ![MenuPrompt example image](https://sv443.net/cdn/jsl/doc/menu_prompt_small.png)
     * @param options The options for the prompt
     * @returns Returns true, if the MenuPrompt was successfully created, a string containing the error message, if not
     * @constructor
     * @since 1.8.0
     * @version 1.8.2 Removed second parameter - use `MenuPrompt.addMenu()` instead
     * @version 1.9.0 The construction of a MenuPrompt object will now set the process.stdin raw mode to true + There is now a `localization` property you can use to translate some messages
     */
    constructor(options: MenuPromptOptions);

    /**
     * 🔹 Opens the menu 🔹
     * ⚠️ Warning: While the menu is opened you shouldn't write anything to the console / to the stdout and stderr as this could mess up the layout of the menu and/or make stuff unreadable
     * @returns Returns true, if the menu could be opened or a string containing an error message, if not
     * @since 1.8.0
     */
    open(): boolean | string;
    
    /**
     * 🔹 Closes the menu prompt and returns the selected options up to this point 🔹
     * @returns Returns the results of the menu prompt as an array of objects
     * @since 1.8.0
     */
    close(): MenuPromptResult[];
    
    /**
     * 🔹 Adds a new menu to the menu prompt.  
     * You can even add new menus while the MenuPrompt is already open. 🔹
     * @param menu The menu to add to the menu prompt
     * @returns Returns true, if the menu could be added or a string containing an error message, if not
     * @since 1.8.0
     */
    addMenu(menu: MenuPromptMenu): boolean | string;
    
    /**
     * 🔹 Returns the (zero-based) index of the current menu of the menu prompt 🔹
     * @returns The zero-based index of the current menu or `-1` if the menu hasn't been opened yet
     * @since 1.8.0
     */
    currentMenu(): number;
    
    /**
     * 🔹 Returns the current results of the menu prompt.
     * This does **not** close the menu prompt, unlike `close()` 🔹
     * @returns Returns the results of the menu prompt or null, if there aren't any results yet
     * @since 1.8.0
     */
    result(): MenuPromptResult;
    
    /**
     * 🔹 Checks a menu for valid syntax 🔹
     * @param menu The menu that should be validated
     * @returns Returns true if the menu is valid, a string array containing the error messages if not
     * @throws Throws an error if a falsy parameter or no parameter at all was passed
     */
    validateMenu(menu: MenuPromptMenu): boolean | string[];
}

/**
 * Supervises a directory and optionally its subdirectories and executes a callback function if one or more of the files have changed.  
 *   
 * **Make sure to use the keyword `new` to create an object of this class, don't just use it like this!**
 */
export class FolderDaemon {
    /**
     * 🔹 Constructs a new object of class FolderDaemon.  
     * The FolderDaemon supervises a directory and listens for changes in the files and then it executes a callback function that is registered with the method `onChanged()`. 🔹
     * @param dirPath The path to the directory you want the daemon to supervise
     * @param filesBlacklist An optional array of [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)) strings. Example: `['*.js']` will block all .js files from being scanned by the daemon.
     * @param recursive Set to `true` to scan for files recursively (in subdirectories). Defaults to `false`
     * @param updateInterval The interval (in milliseconds) at which to scan for changed files. Defaults to `500` ms. Set to `0` to disable the interval, then call `intervalCall()` to manually scan the directory.
     * 
     * @throws Throws an `InvalidPathError` if the path to the directory is invalid
     * @throws Throws a `NotAFolderError` if the path leads to a file instead of a directory
     * @throws Throws a `PatternInvalidError` if the provided glob blacklist pattern is invalid
     * 
     * @since 1.10.0
     */
    constructor(dirPath: string, filesBlacklist?: string[], recursive?: boolean, updateInterval?: number);

    /**
     * 🔹 Registers a callback function to be executed when the FolderDaemon detects one or more changed files 🔹  
     * ⚠️ Warning: If you use the Promise API, due to how it works fundamentally, you will only receive a single callback. If you want to receive more than one callback, either call this function again once the Promise has resolved for the first time or use the callback_fn parameter
     * @param callback_fn Callback function that contains two parameters: the first one, which is either a string or null and the second one which contains an array of strings, which are the absolute paths of the changed files
     * @returns Returns a promise that resolves to an array of strings, which are the absolute paths of the changed files or rejects to an error message.
     */
    onChanged(callback_fn: (error: null | string, daemonResult: string[]) => {}): Promise<string[]>;

    /**
     * 🔹 Removes the previously registered callback function(s) 🔹
     */
    removeCallbacks(): void;

    /**
     * 🔹 This is called on interval to check the folder but feel free to manually call it if you set the interval to `0` or if you want to check the folder at a precise time 🔹
     */
    intervalCall(): void;
}

//#MARKER objects

/**
 * 🔹 Info about SvCoreLib 🔹
 * @since 1.5.0
 * @version 1.8.0 added "contributors" array
 */
export namespace info {
    /** The current version */
    let version: string;
    /** The current version of SvCoreLib, but as an array of numbers for easier manipulation */
    let intVersion: number[];
    /** The name of SvCoreLib */
    let name: string;
    /** A short description of SvCoreLib */
    let desc: string;
    /** The author of SvCoreLib - format: "name <email> (website)" */
    let author: string;
    /** People that contributed to SvCoreLib - this is the raw object from package.json */
    let contributors: object;
    /** The license of SvCoreLib */
    let license: string;
    /** The URL to SvCoreLib's documentation */
    let documentation: string;
}

/**
 * 🔹 Use this to add color to your console output 🔹
 * @since 1.8.0
 * @version 1.10.0 Added `rst` to the `fg` and `bg` objects
 */
export namespace colors {
    /** Resets the color to default */
    let rst: string;
    let fat: string;
    let blink: string;

    /** Sets the foreground (text) color */
    namespace fg {
        let black: string;
        let red: string;
        let green: string;
        let yellow: string;
        let blue: string;
        let magenta: string;
        let cyan: string;
        let white: string;
        /** Resets the color to default */
        let rst: string;
    }
    
    /** Sets the background/backdrop color */
    namespace bg {
        let black: string;
        let red: string;
        let green: string;
        let yellow: string;
        let blue: string;
        let magenta: string;
        let cyan: string;
        let white: string;
        /** Resets the color to default */
        let rst: string;
    }
}
