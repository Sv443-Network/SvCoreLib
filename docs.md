# SvCoreLib - Documentation
[![MIT License](https://img.shields.io/npm/l/svcorelib)](https://sv443.net/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/Sv443-Network/SvCoreLib)](https://github.com/Sv443-Network/SvCoreLib/issues) [![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/svcorelib)](https://snyk.io/)

<br>

This is the documentation of SvCoreLib (also referred to as SCL).  
SvCoreLib, as the name suggests, is the core library used by most Node.js projects of the [Sv443 Network.](https://github.com/Sv443-Network)  
  
This library supports both CommonJS ("vanilla" Node.js) and TypeScript.  
Many features are probably incompatible with Deno (unverified).  
With the exception of certain features that rely on the filesystem, HTTP, SQL or console input, this library should be webpack compatible (also unverified).  
  
Please note that I am not good at writing documentations and this library is pretty big so please use the code examples as an additional guide.  
  
If you don't understand how this documentation works and what certain things mean, please read [this section.](#how-this-documentation-works)  
If you find any bugs or want to suggest a new feature, please [open a new issue on GitHub.](https://github.com/Sv443-Network/SvCoreLib/issues/new/choose)
  
<br>

You can join the Sv443 Network Discord server if you need help or just want to chat:  
  
[![Discord Invite](https://img.shields.io/discord/565933531214118942)](https://dc.sv443.net)

<br>

### >> To get started, please go to [the installation section.](#installation) <<
Otherwise, see the table of contents just below.

<br><br>

<!-- #MARKER ToC -->
## Table of Contents:
- **[Installation](#installation)**
- **[Usage](#usage)**
- **[How this documentation works](#how-this-documentation-works)**
- **[In-IDE Documentation](#in-ide-documentation)**
- **[Functions](#functions)**
    - [File System](#file-system)
        - [downloadFile()](#filesystemdownloadfile) - downloads a file from a provided URL
        - [exists()](#filesystemexists) - modern reimplementation of the deprecated `fs.exists()`
        - [logger()](#filesystemlogger) - logs an error message to the console and/or a log file
        - [readdirRecursive()](#filesystemreaddirrecursive) - async function that recursively searches through a directory
        - [readdirRecursiveSync()](#filesystemreaddirrecursivesync) - synchronous counterpart to `readdirRecursive()`
        - [ensureDirs()](#filesystemensuredirs) - ensures a set of directories exist and creates them if not
        - [ensureDirsSync()](#filesystemensuredirssync) - synchronous counterpart to `ensureDirs()`
    - [Generate UUID](#generate-uuid)
        - [alphanumerical()](#generateuuidalphanumerical) - generates an alphanumerical UUID
        - [binary()](#generateuuidbinary) - generates a binary UUID
        - [custom()](#generateuuidcustom) - generates a custom UUID
        - [decimal()](#generateuuiddecimal) - generates a decimal UUID
        - [hexadecimal()](#generateuuidhexadecimal) - generates a hexadecimal UUID
    - [HTTP](#http)
        - [getClientEncoding()](#httpgetclientencoding) - gets the most efficient encoding from a client request
        - [pipeFile()](#httppipefile) - sends a file to a client
        - [pipeString()](#httppipestring) - sends a string to a client
        - [ping()](#httpping) - pings a specified URL
    - [Seeded RNG](#seeded-rng)
        - [generateRandomSeed()](#seededrnggeneraterandomseed) - generates a random seed
        - [generateSeededNumbers()](#seededrnggenerateseedednumbers) - generates numbers based on a seed
        - [validateSeed()](#seededrngvalidateseed) - validates a seed
    - [SQL](#sql)
        - [sendQuery()](#sqlsendquery) - sends a SQL query
    - [System](#system)
        - [usedHeap()](#systemusedheap) - how much of the heap space is used
        - [inDebugger()](#systemindebugger) - checks if the process is running in a debugger
        - [noShutdown()](#systemnoshutdown) - prevents process shutdown
        - [yesShutdown()](#systemyesshutdown) - re-enables process shutdown
        - [softShutdown()](#systemsoftshutdown) - executes a synchronous function before the process exits
        - [setWindowTitle()](#systemsetwindowtitle) - sets the terminal window's title (Windows & *nix)
    - [Other](#other)
        - [allEqual()](#allequal) - checks if all values in an array are equal
        - [byteLength()](#bytelength) - returns the length of a string in bytes
        - [error()](#error) - sends an error message and/or exits the process
        - [insertValues()](#insertvalues) - inserts values into a preformatted string
        - [isArrayEmpty()](#isarrayempty) - checks if or how many items of an array are empty
        - [isEmpty()](#isempty) - checks if a value is considered empty
        - [mapRange()](#maprange) - maps a number from one numerical range to another
        - [pause()](#pause) - pauses code execution until the user presses a key
        - [randomItem()](#randomitem) - returns a random item from an array
        - [randomizeArray()](#randomizearray) - randomizes the items in an array
        - [randRange()](#randrange) - returns a random number in the provided range
        - [readableArray()](#readablearray) - converts an array to a better readable string
        - [removeDuplicates()](#removeduplicates) - removes duplicate items in an array
        - [halves()](#halves) - returns both halves of an array
        - [replaceAt()](#replaceat) - replaces a character in a string with another string
        - [reserialize()](#reserialize) - loses internal reference of a JSON-compatible object
        - [unused()](#unused) - indicates to a linter that one or more variables are unused
- **[Classes](#classes)**
    - [FolderDaemon](#folderdaemon) - monitors a folder's contents for changes
    - [MenuPrompt](#menuprompt) - a prompt which users can select an option from
    - [ProgressBar](#progressbar) - shows a progress bar in the console
    - [SelectionMenu](#SelectionMenu) - a menu that can be scrolled through
    - [StatePromise](#StatePromise) - wrapper around the Promise API that provides a way to check its state
- **[Errors](#errors)**
    - [SCLError](#errorssclerror) - base class of all SCL error classes
    - [InvalidPathError](#errorsinvalidpatherror) - an invalid path was provided
    - [NotAFolderError](#errorsnotafoldererror) - the provided path is not a folder
    - [PatternInvalidError](#errorspatterninvaliderror) - GLOB pattern is invalid
    - [NoStdinError](#errorsnostdinerror) - terminal doesn't have a stdin channel
    - [InvalidMimeTypeError](#errorsinvalidmimetypeerror) - MIME type is not valid
    - [SqlConnectionNotEstablishedError](#errorssqlconnectionnotestablishederror) - SQL connection is invalid
- **[Objects](#objects)**
    - [colors](#colors) - color text in the console
    - [info](#info) - information about SCL
- **[Legal Information](#legal-information)**
    - [License](#license)
    - [Disclaimer](#disclaimer)
    - [Privacy Policy](#privacy-policy)
    - [Security Policy](#security-policy)

<br>

---

<br><br><br><br>

<!-- #MARKER Installation -->
# Installation
To install SvCoreLib (SCL), use the following command in a terminal inside your Node.js project:  
```
npm i svcorelib
```
Troubleshooting: Make sure your workspace contains a `package.json` file. If not, use `npm init` to initialize your workspace with npm.  

<br><br><br>

<!-- #MARKER Usage -->
# Usage
This explains how you can use SCL in your project.  
  
- If your project runs on "vanilla" Node.js (or CommonJS), use the following at the top of the file you want to include SCL:
    ```js
    const scl = require("svcorelib");
    ```  

<br>

- If your project runs on TypeScript, replace the above with this:
    ```ts
    import * as scl from "svcorelib";
    ```  

The variable `scl` now contains all of SCL's functions, namespaces, classes and objects.
  
<br><br>
  
If you only want to import a select number of features and don't like always having to use a variable like `scl`, you can also use the following syntaxes.  
  
- "Vanilla" Node.js / CommonJS:  
    ```js
    const { function1, namespace1, Class1 } = require("svcorelib");
    ```

<br>

- TypeScript:  
    ```ts
    import { function1, namespace1, Class1 } from "svcorelib";
    ```  
  
**Note:** You need to replace the placeholder names above with the functions / namespaces / classes / objects you want to import.



<br><br><br>


<!-- #MARKER How this documentation works -->
# How this documentation works
- The first code block of each feature tells you about the parameters of the function / method and what type of value it returns.
    - Each parameter name is followed by a colon and then a type name (for example `parameter: string`).
    - If the colon is prefixed by a question mark, this parameter is optional (for example: `parameter?: string`).
    - Everything after the colon or question mark is not needed for actually interfacing with the library. It is merely there to tell you of which type a parameter should be.
    - If there are overloads to the method or function in question, they will be listed on a separate line each ([`randRange()`](#randrange) for example).
- Most features have a code example which is collapsed by default and can be expanded by clicking on it.
- Note that the code examples in this documentation are written in CommonJS.
    - If you use TypeScript, see import instructions in the [usage section](#usage) and modify the other code accordingly.
- All code examples don't require installing any third party packages (excluding SCL's dependencies which should get auto-installed).
- The example GIF included in some features uses the exact code that is included in that same feature under "example code".
- Custom objects (aka interfaces) are declared at the bottom of the class they are part of or at the bottom of the same section if they belong to a normal function.
- Class constructors start with the header `Constructor` and don't have a return type (since they return an instance of the class they belong to).
    - This instance, created with the `new` keyword, should then be used to call the methods that are part of that same class.
    - Do not use methods on the class directly unless the documentation explicitly states that they are static methods!

<br><br><br><br><br>


<!-- #MARKER In-IDE Documentation -->
# In-IDE Documentation
SCL uses a TypeScript type declaration file (`.d.ts`) in order to provide documentation directly in your IDE.  
<details><summary><b>Click here to see an example of how it looks like in Visual Studio Code</b></summary>
  
![(Image)](https://cdn.sv443.net/scl/docs/jsdoc_ide.gif)

</details>

<br>

- Each piece of documentation will have a description. It is usually delimited from other sections by this emoji: 🔹, unless:
    - you are looking at a namespace, for example [`scl.filesystem`](#file-system), its description will instead be marked with this emoji: 🔸
    - it is an event that uses the native module "events" with the `.on("event", (data) => {})` syntax, which is marked by this emoji: 📡
- Some of the functions / methods have special quirks to look out for or will be deprecated. This warning section is delimited from other sections with this emoji: ❗
- Deprecated features should be unlisted in your IDE but if not or you explicitly entered their name, they are indicated with a `@deprecated` tag and they will contain this emoji: ❌  
    Their descriptions should also tell you if there are alternatives.
- You will always encounter a `@since` tag, which indicates with which version the feature was introduced.
- The `@version` tag will tell you that something changed in a certain version.
- If a function / method can throw an error, the `@throws` tag will tell you when this might happen and of which class the Error instance might be.
- Private class methods should be unlisted but if not, they will start with an underscore, will be tagged with `@private` and their description will be delimited from other sections with this emoji: ❌  
    Private methods shouldn't be used, or else something might break.

<br><br><br><br><br>

<!-- #MARKER Functions -->
# Functions
This section tells you all about the static functions SCL offers.  
You have to call these *without* creating a class instance (without using the `new` keyword).  

<br>

<!-- #SECTION File System -->
## File System
This namespace, accessed with `scl.filesystem`, contains a few file-related functions.

<br><br>

> ### filesystem.logger()
> This function logs a message to a file
> ```ts
> scl.filesystem.logger(path: string, content?: string, options?: LoggerOptions): void
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let opts = {
>     timestamp: true,
>     append_bottom: true
> };
> 
> scl.filesystem.logger("./error.log", "There was an error while ...", opts);
> ```
> 
> </details><br>
> 
> ### LoggerOptions object
> ```ts
> {
>     append_bottom: boolean, // set to false to overwrite the entire file instead of appending to the bottom
>     timestamp: boolean      // set to true to add a timestamp to the logged content
> }
> ```


<br><br><br>


> ### filesystem.readdirRecursive()
> Used to recursively search through a directory, returning an array of all files and folders contained within.  
> The returned paths are always absolute, meaning they start on `C:\` (Windows) or `/` (Unix).  
> If you want relative paths instead, use the function [`relative()`](https://nodejs.org/api/path.html#path_path_relative_from_to) of Node's builtin `path` module.  
>   
> This is an asynchronous function. You can either pass a callback function as the second parameter or use the Promise API (`.then()`).  
> This function is less resource-heavy than the synchronous [filesystem.readdirRecursiveSync()](#filesystemreaddirrecursivesync) and it doesn't block the execution of the rest of your code so it is recommended that you try to use this function over the synchronous one.
> ```ts
> scl.filesystem.readdirRecursive(folder: string, callback?: function): Promise<string[]>
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> scl.filesystem.readdirRecursive("./").then(result => {
>     console.log(result);
>     /*
>         [
>             "C:/Users/Foo/Desktop/SCL/index.js",
>             "C:/Users/Foo/Desktop/SCL/package.json",
>             "C:/Users/Foo/Desktop/SCL/bar/test.txt"
>         ]
>     */
> }).catch(err => console.error(err));
> ```


<br><br><br>


> ### filesystem.readdirRecursiveSync()
> Basically the same thing as [filesystem.readdirRecursive()](#filesystemreaddirrecursive), but this function blocks code execution until it's finished, making it synchronous.  
>   
> ❗ This function uses blocking operations, contrary to the asynchronous [filesystem.readdirRecursive()](#filesystemreaddirrecursive) so it is recommended that you try to use the async function over this synchronous one.
> ```ts
> scl.filesystem.readdirRecursiveSync(folder: string): string[]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let paths = scl.filesystem.readdirRecursive("./");
> 
> console.log(paths);
> /*
>     [
>         "C:/Users/Foo/Desktop/SCL/index.js",
>         "C:/Users/Foo/Desktop/SCL/package.json",
>         "C:/Users/Foo/Desktop/SCL/bar/test.txt"
>     ]
> */
> ```


<br><br><br>


> ### filesystem.downloadFile()
> Downloads a file from the specified `url` and puts it in the folder at the specified `destPath`.  
> The parameter `options` needs to be an object of type DownloadOptions (scroll down for definition).  
> The function will return a Promise that resolves to a void value or rejects to an error message string.  
> ```ts
> scl.filesystem.downloadFile(url: string, destPath?: string, options?: DownloadOptions): Promise<string | void>
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let opts = {
>     fileName: "page.html",
>     progressCallback: progress => {
>         console.log(`Download progress: ${progress.currentB} / ${progress.totalB} bytes`);
>     },
>     finishedCallback: err => {
>         if(err)
>             console.error(`Error while downloading: ${err}`);
>         else
>             console.log(`File was downloaded successfully`);
>     }
> };
> 
> scl.filesystem.downloadFile("https://example.org/", "./", opts);
> ```
> 
> </details><br>
> 
> ### DownloadOptions object
> ```ts
> {
>     fileName: string;           // the name that the downloaded file should be saved as, including the file extension. Defaults to "download.txt" if left undefined.
>     progressCallback: function; // a callback function that gets called every 50 milliseconds that gets passed an object containing info on the download progress (scroll down for more info) - sometimes the download progress can't be gotten so this callback won't contain the total size or will not be called a final time on finish. This behavior is normal.
>     finishedCallback: function; // a callback function that gets called when the download finished and gets passed a parameter that is `null` if no error was encountered, or contains a string if an error was encountered
> }
> ```
>
> ### DownloadProgress object
> ```ts
> {
>     currentB: number;  // current progress in bytes
>     currentKB: number; // current progress in kilobytes
>     currentMB: number; // current progress in megabytes
>     totalB: number;    // total file size in bytes
>     totalKB: number;   // total file size in kilobytes
>     totalMB: number;   // total file size in megabytes
> }
> ```


<br><br><br>

> ### filesystem.exists()
> This function checks if a file exists at the given path.  
> (Reimplementation of [`fs.exists()`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback) based on `fs.access()`)  
>   
> The parameter `path` specifies which file to check for its existence - This path gets passed through [`path.resolve()`](https://nodejs.org/api/path.html#path_path_resolve_paths)  
>   
> A Promise is returned that always resolves to a boolean.  
>   
> This function throws a `TypeError` if the `path` argument is not a string or couldn't be resolved to a valid path.
> 
> ```ts
> scl.filesystem.exists(path: string): Promise<boolean>;
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> async function checkExists()
> {
>     let foo = await scl.exists("./index.js");
>     let bar = await scl.exists("./path/that/doesn't/exist.txt");
> 
>     console.log(foo); // true
>     console.log(bar); // false
> }
> 
> checkExists();
> ```
> 
> </details><br>


<br><br><br>


> ### filesystem.ensureDirs()
> This function ensures a set of directories exists and creates them if not.  
>   
> A path of the `directories` parameter can also contain sub-directories (see example).  
> In this case the full path will also be created if it doesn't exist.
> 
> ```ts
> scl.filesystem.ensureDirs(directories: string[]): Promise<void>;
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { filesystem } = require("svcorelib");
> 
> 
> const dirs = [ "data/foo", "data/bar/baz" ];
> 
> async function init()
> {
>     await filesystem.ensureDirs(dirs);
> }
> 
> init();
> ```
> 
> </details><br>


<br><br><br>


> ### filesystem.ensureDirsSync()
> This function ensures a set of directories exists and creates them if not.  
>   
> A path of the `directories` parameter can also contain sub-directories (see example).  
> In this case the full path will also be created if it doesn't exist.  
>   
>  ❗ This function blocks the main thread, contrary to the asynchronous [filesystem.ensureDirs()](#filesystemensuredirs) so it is recommended that you try to use the async function over this synchronous one.
> 
> ```ts
> scl.filesystem.ensureDirsSync(directories: string[]): void;
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { filesystem } = require("svcorelib");
> 
> 
> const dirs = [ "data/foo", "data/bar/baz" ];
> 
> function init()
> {
>     filesystem.ensureDirsSync(dirs);
> }
> 
> init();
> ```
> 
> </details><br>


<br><br><br><br>


<!-- #SECTION Generate UUID -->
## Generate UUID
This namespace, accessed with `scl.generateUUID`, offers a few functions to generate Universally Unique Identifiers (UUIDs).  
  
One thing these functions all have in common is the `uuidFormat` parameter.  
This parameter is a string that should contain the characters `x` and `y`. These letters will be replaced by random letters or numbers, while any other characters are left untouched.  
Prefixing an `x` or `y` with a caret (`^`) will prevent it from being replaced with a random letter or number.  
Example: a format of `x^x-y^y` might produce a result similar to this: `1x-cy`


<br><br>


> ### generateUUID.alphanumerical()
> This function generates an alphanumerical (`A-Z0-9` or `a-z0-9`) UUID.  
> The parameter `uuidFormat` is explained [here.](#generate-uuid)  
> If the parameter `upperCase` is set to `true`, the resulting UUID will have its alphabetical letters in uppercase.
> ```ts
> scl.generateUUID.alphanumerical(uuidFormat: string, upperCase?: boolean): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let uuid = scl.generateUUID.alphanumerical("xxxx-yyyy", true);
> 
> console.log(uuid); // "U45A-AS6X"
> ```
> 
> </details>


<br><br><br>


> ### generateUUID.binary()
> This function generates a binary (`0-1` or `true-false`) UUID.  
> The parameter `uuidFormat` is explained [here.](#generate-uuid)  
> If the parameter `asBooleanArray` is set to `true`, the resulting UUID will be an array of booleans. Any characters of the `uuidFormat` that aren't `x` or `y` will then be ignored.
> ```ts
> scl.generateUUID.binary(uuidFormat: string, asBooleanArray?: boolean): string | boolean[]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let foo = scl.generateUUID.binary("xxxx-yyyy");
> let bar = scl.generateUUID.binary("xxxx", true);
> 
> console.log(foo); // "1110-1010"
> console.log(bar); // [ true, true, false, true ]
> ```
> 
> </details>


<br><br><br>


> ### generateUUID.custom()
> This function generates a custom UUID.  
>   
> The parameter `uuidFormat` is explained [here.](#generate-uuid)  
>   
> The parameter `possibleValues` needs to be a string array of characters that should be used to generate the UUID.  
> ```ts
> scl.generateUUID.custom(uuidFormat: string, possibleValues: string[]): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let foo = scl.generateUUID.custom("xxxx-yyyy", "abcd#+_!".split(""));
> let bar = scl.generateUUID.custom("xxxx-yyyy", ["1", "2"]); // binary system using 1s and 2s maybe? 👀
> 
> console.log(foo); // "b+_c-d#ad"
> console.log(bar); // "2212-1211"
> ```
> 
> </details>


<br><br><br>


> ### generateUUID.decimal()
> This function generates a decimal (`0-9`) UUID.  
>   
> The parameter `uuidFormat` is explained [here.](#generate-uuid)
> ```ts
> scl.generateUUID.decimal(uuidFormat: string): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let uuid = scl.generateUUID.decimal("xxxx-yyyy");
> 
> console.log(uuid); // "5563-0291"
> ```
> 
> </details>


<br><br><br>


> ### generateUUID.hexadecimal()
> This function generates a hexadecimal (`a-f0-9` or `A-F0-9`) UUID.  
>   
> The parameter `uuidFormat` is explained [here.](#generate-uuid)  
> If the parameter `upperCase` is set to `true`, the resulting UUID will have its alphabetical letters in uppercase.
> ```ts
> scl.generateUUID.hexadecimal(uuidFormat: string, upperCase?: boolean): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let uuid = scl.generateUUID.hexadecimal("xxxx-yyyy", true);
> 
> console.log(uuid); // "F6B6-EFA3"
> ```
> 
> </details>


<br><br><br><br>


<!-- #SECTION HTTP -->
## HTTP
This namespace, accessed with `scl.http`, offers functions that make using Node's builtin `http` and `https` modules and third-party packages based on them easier to use.  


<br><br>


> ### http.getClientEncoding()
> This function parses the `Accept-Encoding` header of a clien't request and returns the most efficient and modern encoding methods the client supports.  
> If no header was provided or the client doesn't support any encodings, `"identity"` is returned, meaning the client wants the original, non-encoded data.  
>   
> ```ts
> scl.http.getClientEncoding(req: http.IncomingMessage): string
> ```
>   
> Currently supported encoding methods (sorted by priority, highest priority first) are:  
> | Encoding | Name | Priority |
> | :-- | :-- | :-: |
> | `br` | [Brotli](https://en.wikipedia.org/wiki/Brotli) | 4 |  
> | `gzip` | [Gzip / Lempel-Ziv / LZ77](https://en.wikipedia.org/wiki/Gzip) | 3 |  
> | `deflate` | [Deflate](https://en.wikipedia.org/wiki/DEFLATE) | 2 |  
> | `compress` | [Lempel-Ziv-Welch / LZW](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Welch) | 1 |  
> | `identity` | No Encoding / Raw Data | 0 |  
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const http = require("http");
> const scl = require("svcorelib");
> 
> http.createServer((req, res) => {
>     if(req.method == "GET")
>     {
>         console.log(`Client accepts encodings: ${req.headers["accept-encoding"]}`); // "Client accepts encodings: gzip, deflate"
>
>         // let SCL determine the encoding that's highest on the priority list and also supported by the client (present in the "Accept-Encoding" header)
>         const clientEncoding = scl.http.getClientEncoding(req);
> 
>         res.writeHead(200, { "Content-Type": "text/plain; utf-8" });
>         res.end(`Selected encoding: ${clientEncoding}`); // "Selected encoding: gzip"
>     }
> }).listen(80, undefined, err => {
>     if(err)
>         console.error(`Error while setting up HTTP server: ${err}`);
>     else
>         console.log(`HTTP server is listening at http://127.0.0.1/`);
> });
> ```
> 
> </details>


<br><br><br>


> ### http.pipeFile()
> This function responds to a client's request by efficiently sending them the contents of a file.  
> Because it streams / pipes the file to the client directly from your drive and it doesn't need to be loaded entirely into RAM first, it is less resource-heavy.  
>   
> The parameter `res` contains the server's response to the client's request.  
> Put the path to the file you want to send to the client in the parameter `filePath`.  
> The parameter `mimeType` needs to be passed a valid [MIME (Multipurpose Internet Mail Extensions) type.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) If left empty, this will default to `text/plain`.  
> The `statusCode` parameter needs to be passed a [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) number. If left empty, this will default to `200`.
>   
> The function will return `null` if everything went according to plan or will return a string containing an error message if not.
> ```ts
> scl.http.pipeFile(res: http.ServerResponse, filePath: string, mimeType?: string, statusCode?: number): null | string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const http = require("http");
> const scl = require("svcorelib");
> const path = require("path");
> 
> http.createServer((req, res) => {
>     if(req.method == "GET")
>     {
>         // requires a file "index.html" to exist at the project's root dir (where package.json sits)
>         // using resolve() of Node's builtin "path" module will ensure that the path is valid and can be understood by SCL
>         scl.http.pipeFile(res, path.resolve("./index.html"), "text/html", 200);
>     }
> }).listen(80, undefined, err => {
>     if(err)
>         console.error(`Error while setting up HTTP server: ${err}`);
>     else
>         console.log(`HTTP server listening at 127.0.0.1:80`);
> });
> ```
> 
> </details>


<br><br><br>


> ### http.pipeString()
> This function responds to a client's request by efficiently sending them a string.  
> Because it streams / pipes the string to the client and it doesn't need to be stored in a variable, there's not that big of a toll on your RAM.  
>   
> The parameter `res` contains the server's response to the client's request.  
> Put the string you want to send to the client in the parameter `text`.  
> The parameter `mimeType` needs to be passed a valid [MIME (Multipurpose Internet Mail Extensions) type.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) If left empty, this will default to `text/plain`.  
> The `statusCode` parameter needs to be passed a [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) number. If left empty, this will default to `200`  
>   
> The function will return `null` if everything went according to plan or will return a string containing an error message if not.
> ```ts
> scl.http.pipeString(res: http.ServerResponse, text: string, mimeType?: string, statusCode?: number): null | string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const http = require("http");
> const scl = require("svcorelib");
> 
> http.createServer((req, res) => {
>     if(req.method == "GET")
>     {
>         scl.http.pipeString(res, `Hello, World!\nThis is my website running on Node.js ${process.version}`, "text/plain", 200);
>     }
> }).listen(80, undefined, err => {
>     if(err)
>         console.error(`Error while setting up HTTP server: ${err}`);
>     else
>         console.log(`HTTP server listening at 127.0.0.1:80`);
> });
> ```
> 
> </details>


<br><br><br>


> ### http.ping()
> Pings the specified URL and returns its status code, status message, response time and `Content-Type` header.  
>   
> The param `url` needs to be passed a valid URL.  
> Use `timeout` to specify a maximum timeout in milliseconds after which the ping should be cancelled. Defaults to 5000.  
> The function returns a promise that resolves with an object containing all the values you need (scroll down for more info) or a string containing an error message.
> ```ts
> scl.http.ping(url: string, timeout?: number): Promise<PingReturnValues>
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> scl.http.ping("https://example.org/", 5000)
>     .then(res => {
>         console.log(`Status ${res.statusCode} (${res.statusMessage}) - Ping: ${res.responseTime}ms`); // Status 200 (OK) - Ping: 526ms
>     })
>     .catch(err => {
>         console.error(`Error while pinging URL: ${err}`);
>     });
> ```
> 
> </details><br>
> 
> ### PingReturnValues object
> ```ts
> {
>     statusCode: number;    // The ping's returned status code (eg. 200 or 404)
>     statusMessage: string; // The status message of the ping - Could be something like "OK" for status 200 or "Not Found" for status 404
>     responseTime: number;  // The response time in milliseconds as an integer
>     contentType: string;   // The `Content-Type` header - this will contain the MIME type and the content encoding, for example: "text/html; charset=UTF-8"
> }
> ```


<br><br><br><br>


<!-- #SECTION Seeded RNG -->
## Seeded RNG
This namespace, accessed with `scl.seededRNG`, offers a few functions to generate numbers based on a seed.  
This means that using the same seed, you will be able to generate the same numbers over and over again, just like Minecraft's world seeds for example.  
Seeds in SCL need to be of a certain format. Some other functions in this section will help you accomplish just that.


<br><br>


> ### seededRNG.generateRandomSeed()
> This function generates a random seed to be used in [generateSeededNumbers()](#seededrnggenerateseedednumbers)  
> Since seeds in SCL need to be of a certain format (a number or string containing only numbers that can't start with a `0`), I recommend you use this function to randomize the seeds.  
>   
> The parameter `digitCount` specifies how many digits the resulting seed should have.
> ```ts
> scl.seededRNG.generateRandomSeed(digitCount: number): number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let seed = scl.seededRNG.generateRandomSeed(5);
> 
> console.log(seed); // 35091
> ```
> 
> </details>


<br><br><br>


> ### seededRNG.generateSeededNumbers()
> This function generates the actual pseudo-random numbers based on a seed.  
>   
> Seeds in SCL need to be of a certain format (a number or string containing only numbers that can't start with a `0`).  
> That's why I recommend generating them with [generateRandomSeed()](#seededrnggeneraterandomseed) or validating them with [validateSeed()](#seededrngvalidateseed).
>   
> With the parameter `count` you can specify how many pseudo-random numbers you want to receive. Defaults to 16 if left undefined.  
> The `seed` parameter is where you should provide your seed. If no seed is provided, a random seed will be generated. You will be able to access this seed in the returned object.
> ```ts
> scl.seededRNG.generateSeededNumbers(count?: number, seed?: number | string): SeededRandomNumbers
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let seed = scl.seededRNG.generateRandomSeed(5); // 58157
> 
> let foo = scl.seededRNG.generateSeededNumbers(8, seed);
> let bar = scl.seededRNG.generateSeededNumbers(8, seed);
> 
> console.log(foo.integer === bar.integer); // true - the numbers are identical since the seed is identical
> 
> console.log(foo); // { ... } - (see below for how this object is structured)
> ```
> 
> </details><br>
> 
> ### SeededRandomNumbers object
> ```ts
> {
>     numbers: number[],   // an array of numbers
>     stringified: string, // a string containing the numbers
>     integer: number,     // the generated numbers as an integer / number
>     seed: number         // the seed that was used to generate the numbers
> }
> ```


<br><br><br>


> ### seededRNG.validateSeed()
> This function validates a seed to be used in [generateSeededNumbers()](#seededrnggenerateseedednumbers)  
> It is especially useful to validate user-entered seeds.  
>   
> Seeds in SCL need to be of a certain format (a number or string containing only numbers that can't start with a `0`).  
> This function does exactly those checks to ensure the seed is valid.  
>   
> The `seed` parameter is where you should provide your seed. It can be a string or a number.  
> It also accepts octal and hexadecimal notation (like `0123` and `0x123`).
> ```ts
> scl.seededRNG.validateSeed(seed: number | string): boolean
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let foo = jsl.seededRNG.validateSeed(35091);
> let bar = jsl.seededRNG.validateSeed("35091");
> let baz = jsl.seededRNG.validateSeed("hello I am a string");
> 
> console.log(foo); // true
> console.log(bar); // true
> console.log(baz); // false
> ```
> 
> </details>


<br><br><br>


<!-- #SECTION SQL -->
## SQL
This namespace, accessed with `scl.sql`, offers functions to interface with SQL databases.  
These functions depend on the package [`mysql`](https://www.npmjs.com/package/mysql).  


<br><br>


> ### sql.sendQuery()
> Sends a formatted (SQLI-protected) query.  
>   
> The param `connection` needs to be passed an SQL connection instantiated with [`mysql.createConnection()`](https://www.npmjs.com/package/mysql#establishing-connections)  
> The param `query` needs to be passed the SQL query with question marks where the inserted values should be.  
> The param `options` needs to be passed an object of options of this query. [Here are the possible properties](https://www.npmjs.com/package/mysql#connection-options) - leave undefined to choose the default options.  
> The rest parameter `insertValues` needs to be passed the values to be inserted into the question marks - use the primitive type `null` for an empty value.  
>   
> The returned promise resolves to an object containing the response from the database or rejects to an error string.
> ```ts
> scl.sql.sendQuery(connection: mysql.Connection, query: string, options?: mysql.QueryOptions, ...insertValues: null | string | number): Promise<object>
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { sql } = require("svcorelib");
> const mysql = require("mysql");
> 
> 
> const options = {
>     timeout: 2000 // after how many milliseconds the queries should time out if they didn't get a response
> };
> const database = "database_name"; // set the database name here
> 
> // create SQL connection
> let sqlConnection = mysql.createConnection({
>     host: "127.0.0.1",                 // IP address of the SQL server (127.0.0.1 means the server runs locally)
>     user: process.env.DB_USER,         // requires setting these values in the environment variables - I recommend using the "dotenv" package for this
>     password: process.env.DB_PASSWORD, // see above ^
>     insecureAuth: true                 // this is required on newer version of MySQL (like 8.0) since they require some weird ass more secure auth
> });
> 
> // try to connect with the above settings
> sqlConnection.connect(err => {
>     if(err)
>         return console.error(`Error: ${err}`);
> 
>     // send the actual query
>     sql.sendQuery(sqlConnection, "SELECT * FROM ??.tablename LIMIT 10", options, database).then(res => {
>         console.log(JSON.stringify(res, undefined, 4));
>     }).catch(err => {
>         console.error(`Error: ${err}`);
>     });
> });
> ```
> 
> </details>


<br><br><br>


<!-- #SECTION System -->
## System
This namespace, accessed with `scl.system`, offers functions that refer to the system the process is executed on or the process itself.  


<br><br>


> ### system.usedHeap()
> Returns the percentage of heap space that is used by the process as a floating point number between 0 and 100.
> ```ts
> scl.system.usedHeap(): number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { system } = require("svcorelib");
> 
> console.log(`Used heap space: ${system.usedHeap().toFixed(2)}%`);
> ```
> 
> </details>


<br><br>


> ### system.inDebugger()
> Checks if the process is currently running in a debugger.  
> This can be useful because some features like child processes and reading from stdin do not work in most debuggers.  
> Should support all major Node.js debuggers, but this is not guaranteed.  
> Returns `true` if the current process runs in a debugger - else returns `false`  
>   
> If `checkArg` is provided, the function searches for a matching command line argument and returns `true` if it was found.  
> This enables you to explicitly set the debugger state, for example if your debugger isn't properly detected by this function.
> ```ts
> scl.system.inDebugger(checkArg?: string): boolean
> ```
> 
> <br><details><summary><b>Basic example code - click to show</b></summary>
> 
> ```js
> const { system, MenuPrompt } = require("svcorelib");
> 
> if(!system.inDebugger())
> {
>     // SCL's MenuPrompt doesn't work in some debuggers since it needs to read from process.stdin
>     const mp = new MenuPrompt();
>     // ...
> }
> ```
> 
> </details>
> 
> <br><details><summary><b>Example with custom CLI argument - click to show</b></summary>
> 
> ```js
> const { system } = require("svcorelib");
> 
> console.log(process.argv); // [ '.../node.exe', '.../this_file.js', '--debugger-enabled' ]
> 
> // explicitly test if `--debugger-enabled` is present in the CLI arguments
> if(system.inDebugger("--debugger-enabled"))
> {
>     console.log("in debugger");
> }
> ```
> 
> </details>


<br><br><br>


> ### system.noShutdown()
> Prevents the process from being shut down.  
> This can prevent people from exiting the process using CTRL+C.  
> Using `process.exit()` in your script will still exit the process though!  
> If you want the process to be able to be shut down again, use [`scl.yesShutdown()`](#systemyesshutdown).
>   
> Note: this only listens for the signals "SIGINT" and "SIGTERM".  
> Due to many OSes not supporting it, using "SIGKILL" will still kill the process.
> ```ts
> scl.system.noShutdown(): void
> ```


<br><br><br>


> ### system.yesShutdown()
> Removes the script shut down prevention that was previously enabled with [`scl.noShutdown()`](#systemnoshutdown).
> ```ts
> scl.system.yesShutdown(): void
> ```


<br><br><br>


> ### system.softShutdown()
> Executes a function or Promise before the process is exited.  
> Rejecting the Promise will prevent a shutdown.  
>   
> ❗ **Warning:**
> - If `scl.noShutdown()` was used, the passed function will be executed, but the process will not exit
> - Due to how the Promise API works, you will need to call this function again if the passed Promise is rejected
> 
> <br>
> 
> ```ts
> scl.system.softShutdown(funct: function | Promise, code?: number): void
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { system } = require("svcorelib");
> 
> const promise = new Promise((res) => {
>     console.log("Goodbye!");
> 
>     // sqlConnection.close();
>     // someOtherStuff.end();
> 
>     setTimeout(() => res(), 1000);
> });
> 
> system.softShutdown(promise);
> 
> // trigger shutdown:
> process.exit();
> ```
> 
> </details>


<br><br><br>


> ### system.setWindowTitle()
> Sets the window title of the CLI / terminal.  
> This function supports most OSes (tested on Windows, Linux and macOS).
> ```ts
> scl.system.setWindowTitle(title: string): void
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { system } = require("svcorelib");
> const packageJson = require("./package.json"); // adjust this path if you're not in the project root dir
> 
> system.setWindowTitle(`${packageJson.name} v${packageJson.version}`);
> ```
> 
> </details>


<br><br><br>


<!-- #SECTION Other -->
## Other
This namespace, accessed with just `scl`, offers many miscellaneous functions.  


<br><br>


> ### allEqual()
> This function checks whether or not all items of an array are equal or not.  
> Set `loose` to true to switch to loose equality comparison (`==`) instead of the default strict equality comparison (`===`).  
> It returns `true` if all items are equal or `false` if not.  
> ```ts
> scl.allEqual(array: any[], loose?: boolean): boolean
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let foo = scl.allEqual([ 1, 1, 1, 1 ]);
> let bar = scl.allEqual([ 1, 1, 2, 1 ]);
> 
> let bazLoose = scl.allEqual([ 1, true, "1" ], true);
> let bazStrict = scl.allEqual([ 1, true, "1" ]);
> 
> 
> console.log(foo);       // true
> console.log(bar);       // false
> console.log(bazLoose);  // true
> console.log(bazStrict); // false
> ```
> 
> </details>


<br><br><br>


> ### byteLength()
> This function returns the length / size of a string in bytes.  
> If the param `str` is not of type string, the function will return `-1`.
> ```ts
> scl.byteLength(str: string): number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let str1 = "hello 👋";
> let str2 = "𒈘"; // this character is U+12218
> 
> let foo = scl.byteLength(str1);
> let bar = scl.byteLength(str2);
> 
> console.log(str1.length); // 8
> console.log(foo);         // 10
> 
> console.log(str2.length); // 2
> console.log(bar);         // 4
> ```
> 
> </details>


<br><br><br>


> ### error()
> Sends a red console message and optionally exits the process with a certain status code.  
>   
> The param `cause` specifies the actual error message.  
> If you want the error to be logged to a log file, specify the path to it with the `log_file_path` parameter. Make sure the path up to the file exists!  
> If `shutdown` is set to `true`, SCL will exit the process.  
> Set an exit code with the param `status`. Leaving it empty will default to `1`  
> If you don't want to log the error to the console, set `consoleMsg` to `false`
> ```ts
> scl.error(cause: string, log_file_path?: string, shutdown?: boolean, status?: number, consoleMsg?: boolean): void
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> const { resolve } = require("path");
> 
> scl.error("Couldn't establish a connection to the API", resolve("./errors/fatal.log"), true, 1);
> // Logs a red message to the console, puts it in the log file at "./errors/fatal.log", then exits the process with code 1
> ```
> 
> </details>


<br><br><br>


> ### isArrayEmpty()
> Checks how many values of an array are empty (does the same check as [`scl.isEmpty()`](#isempty), but on each array item).  
> Returns `true` if all items are empty, `false` if none are empty, or returns a number of how many items are empty.
> ```ts
> scl.isArrayEmpty(array: any[]): boolean | number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let foo = scl.isArrayEmpty([ 1, 2, 3, 4, "", null, 5 ]);
> let bar = scl.isArrayEmpty([ "", null, undefined ]);
> let baz = scl.isArrayEmpty([ 1, 2, 3, 4, 5, NaN ]);
> 
> console.log(foo); // 2
> console.log(bar); // true
> console.log(baz); // false
> ```
> 
> </details>


<br><br><br>


> ### isEmpty()
> Returns true, if the `input` is undefined, null, an empty string, an empty array or an object with length = 0.  
> Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed!
> ```ts
> scl.isEmpty(input: any): boolean
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> console.log(scl.isEmpty(""));        // true
> console.log(scl.isEmpty([]));        // true
> console.log(scl.isEmpty({}));        // true
> console.log(scl.isEmpty({ a: 1 }));  // false
> console.log(scl.isEmpty(0));         // false
> console.log(scl.isEmpty(1));         // false
> console.log(scl.isEmpty(null));      // true
> console.log(scl.isEmpty(undefined)); // true
> console.log(scl.isEmpty(NaN));       // false
> console.log(scl.isEmpty("foo"));     // false
> ```
> 
> </details>


<br><br><br>


> ### mapRange()
> Transforms the `value` parameter from the numerical range `range_1_min`-`range_1_max` to the numerical range `range_2_min`-`range_2_max`.  
> For example, you can map the value 2 in the range of 0-5 to the range of 0-10 and you'd get a 4 as a result.  
> It can be especially useful when using SCLs [`ProgressBar`](#progressbar) class.  
> This function is the same as the [map() function in Arduino.](https://www.arduino.cc/reference/en/language/functions/math/map/)
> ```ts
> scl.mapRange(value: number, range_1_min: number, range_1_max: number, range_2_min: number, range_2_max: number): number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let foo = scl.mapRange(10, 0, 100, 0, 10);
> let bar = scl.mapRange(3, 0, 10, 0, 50);
> 
> console.log(foo); // 1
> console.log(bar); // 15
> ```
> 
> </details>


<br><br><br>


> ### pause()
> Asks the user for a key press and then resolves a promise.  
>   
> Specify the text to display with the param `text` - if left empty this defaults to "Press any key to continue..."  
> The promise gets passed the key that the user has pressed.
> ```ts
> scl.pause(text?: string): Promise<string>
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> console.log("Hello, World!");
> 
> scl.pause("Press any key to exit").then(key => {
>     console.log(`Pressed key: ${key}\nGoodbye, World!`);
>     process.exit();
> });
> ```
> 
> </details>


<br><br><br>


> ### randomItem()
> Returns a random item of an array.
> ```ts
> scl.randomItem(array: any[]): any
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let array = [ 0, 1, null, 2, NaN, 3, { foo: "bar" }, 4, 5, 6 ];
> 
> let foo = scl.randomItem(array);
> let bar = scl.randomItem(array);
> let baz = scl.randomItem(array);
> 
> console.log(foo); // { "foo": "bar" }
> console.log(bar); // 3
> console.log(baz); // null
> ```
> 
> </details>


<br><br><br>


> ### randomizeArray()
> Randomizes the order of items of an array and returns it.
> ```ts
> scl.randomizeArray(array: any[]): any[]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let array = [ 0, 1, 2, 3, 4, 5, 6 ];
> 
> let foo = scl.randomizeArray(array);
> let bar = scl.randomizeArray(array);
> 
> console.log(foo); // [ 1, 0, 2, 3, 5, 4, 6 ]
> console.log(bar); // [ 6, 1, 5, 2, 3, 4, 0 ]
> ```
> 
> </details>


<br><br><br>


> ### randRange()
> Highly random number generator where you can specify an upper and lower boundary.  
>   
> Specify the upper and lower boundary with the parameters `min` and `max`  
> If `min` is not provided, it will be set to the default of `0`  
>   
> ❗ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function!
> ```ts
> scl.randRange(min: number, max: number): number
> scl.randRange(max: number): number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { randRange } = require("svcorelib");
> 
> let foo = randRange(50, 60);
> let bar = randRange(10);
> 
> console.log(foo); // 57
> console.log(bar); // 3
> ```
> 
> </details>


<br><br><br>


> ### readableArray()
> Converts an array to a better readable string.  
>   
> You can specify separators with the param `separators` - this will default to `, `  
> The last separator can be set with the param `lastSeparator` - this will default to ` and `
> ```ts
> scl.readableArray(array: any[], separators?: string, lastSeparator?: string): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> console.log(scl.readableArray([ 1, 2, 3, 4 ])); // "1, 2, 3 and 4"
> ```
> 
> </details>


<br><br><br>


> ### removeDuplicates()
> Removes duplicate items of an array.
> ```ts
> scl.removeDuplicates(array: any[]): any[]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let array = scl.removeDuplicates([ 1, 2, 4, 3, 3, 1, 3 ]);
> 
> console.log(array); // [ 1, 2, 4, 3 ]
> ```
> 
> </details>
> </details>


<br><br><br>


> ### halves()
> Returns both halves of an array as a tuple.  
>   
> If the passed array has one entry, the returned tuple also only has one entry.  
> If the passed array is empty, the returned array will be empty.
> ```ts
> scl.halves(array: any[]): [any[], any[]]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> const halves = scl.halves([ 1, 2, 3, 4, 5, 6, 7 ]);
> const [first, second] = halves;
> 
> console.log(halves); // [ [ 1, 2, 3, 4 ], [ 5, 6, 7 ] ]
> 
> console.log(first); // [ 1, 2, 3, 4 ]
> console.log(second); // [ 5, 6, 7 ]
> ```
> 
> </details>


<br><br><br>


> ### insertValues()
> Inserts values into a preformatted string containing so called insertion marks.  
> If there are no insertion marks, this function returns the unmodified input string.  
>   
> The parameter `str` is a string containing numbered insertion marks in the format `%1`, `%2`, `%99`, `%999`, ...  
> The `values` param is a rest parameter containing any values that can be converted to a string.  
>   
> This function throws a `TypeError` if the parameter `str` is not a string or if one of the values could not be converted to a string.
> ```ts
> insertValues(str: string, ...values: any[]): string;
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> class Person {
>     constructor(name, age)
>     {
>         this.name = name;
>         this.age = age;
>     }
> 
>     text()
>     {
>         return scl.insertValues("%1 is %2 years old", this.name, this.age);
>     }
> }
> 
> let sven = new Person("Sven", 20);
> console.log(sven.text()); // "Sven is 20 years old"
> ```
> 
> </details>


<br><br><br>


> ### replaceAt()
> Replaces a character from the specified `string` at the specified `index` with the value of `replacement`
> ```ts
> scl.replaceAt(input: string, index: number, replacement: string): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> let text = scl.replaceAt("Hello, World!", 5, ", beautiful");
> 
> console.log(text); // Hello, beautiful World!
> ```
> 
> </details>


<br><br><br>


> ### reserialize()
> Reserializes a JSON-compatible object. This means it copies the value of an object and loses the internal reference to it.  
> Using an object that contains special JavaScript classes or a circular structure will result in unexpected behavior.  
>   
> Set `immutable` to `true` to freeze the returned object, making it non-modifiable.  
> If `obj` is not of type `object`, this function will just return the unmodified original value.
> ```ts
> scl.reserialize(obj: object, immutable?: boolean): object
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> // without reserialize:
> {
>     let x = { foo: "bar" };
>     let y = x;
> 
>     y.foo = "test"; // sets "foo" to "test" on both x and y
> 
>     console.log(x.foo); // test
>     console.log(y.foo); // test
> }
> 
> 
> // with reserialize:
> {
>     let x = { foo: "bar" };
>     let y = scl.reserialize(x);
> 
>     y.foo = "test"; // sets "foo" to "test" only on y and not on x
> 
>     console.log(x.foo); // bar
>     console.log(y.foo); // test
> }
> 
> 
> // example with setting it to immutable:
> {
>     let x = { foo: "bar" };
>     let y = scl.reserialize(x, true);
> 
>     y.foo = "test"; // doesn't work, y.foo is still set to "bar"
> 
>     console.log(x.foo); // bar
>     console.log(y.foo); // bar
> }
> ```
> 
> </details>


<br><br><br>


> ### unused()
> Use this if you are using a linter that complains about unused vars.  
> As this function basically does nothing, you can even leave it in once the variable is used again and nothing will break.  
> The function accepts a virtually infinite amount of parameters of any type.
> ```ts
> scl.unused(...any: any): void
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const { unused } = require("svcorelib");
> 
> let my_unused_var = "Hello, World!"; // linter doesn't warn you about this line when using unused()
> 
> unused(my_unused_var);
> ```
> 
> </details>


<br><br><br><br><br>

<!-- #MARKER Classes -->
# Classes
This section contains all of SCL's classes.  
If you don't know about Object Oriented Programming in JavaScript, you can learn about it [here.](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)  
Classes need to be created with the `new` keyword unless a method explicitly states that it is static.


<br>


<!-- #SECTION FolderDaemon -->
> ## FolderDaemon
> The FolderDaemon supervises a directory and optionally its subdirectories and executes a callback function if one or more of the files have changed.  
> *Changed* means if a file's content or metadata was modified, a file has been removed or a file has been added.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `FolderDaemon`.  
> >   
> > Specify the path to the directory you want to supervise with the param `dirPath`.  
> > The optional parameter `options` has to be an object of type [`FolderDaemonOptions`](#folderdaemonoptions-object)
> > ```ts
> > new FolderDaemon(dirPath: string, options?: FolderDaemonOptions)
> > ```
> 
> 
> <br><br>
> 
> 
> > ### onChanged()
> > This method sets a callback function to be executed when files have changed.  
> > It can both call a function passed in the param `callback_fn` and it also returns a Promise.  
> >   
> > The promise will only be resolved once though. This is a limitation of the Promise API.  
> > If you need to use the promise API and want multiple callbacks, you can just re-call this method after the promise has resolved every single time.  
> > If the promise is resolved, you will get a single parameter, which is an array of strings, which contain the absolute file paths of all changed files.  
> >   
> > The callback function gets passed two parameters:  
> > - `error` which can be either `null` or a string containing an error message  
> > - `daemonResult` which is an array of strings containing absolute file paths to the changed files  
> > ```ts
> > FolderDaemon.onChanged(callback_fn: (error: null | string, daemonResult: string[]) => void): Promise<string[]>
> > ```
> 
> 
> <br><br>
> 
> 
> > ### removeCallbacks()
> > This method removes the callback function(s) which have been registered with [`FolderDaemon.onChanged()`](#onchanged)
> > ```ts
> > FolderDaemon.removeCallbacks(): void
> > ```
> 
> 
> <br><br>
> 
> 
> > ### intervalCall()
> > This method causes the FolderDaemon to re-scan the directory.  
> > It is mandatory if you set the `updateInterval` to 0.
> > ```ts
> > FolderDaemon.intervalCall(): void
> > ```
> 
> 
> <br><br>
> 
> 
> > ### FolderDaemonOptions object
> > This object is used in the construction of a FolderDaemon.  
> >   
> > If you set `recursive` to `true`, the FolderDaemon will recursively look through all subdirectories of the specified directory.  
> > The `updateInterval` property can be used to set an interval at which the daemon should check all files. Defaults to `500` ms - set to `0` to disable the interval, then call `intervalCall()` to manually scan the directory.  
> >   
> > The property `blacklist` can be passed an array of strings which contain [glob patterns.](https://en.wikipedia.org/wiki/Glob_(programming)) If a file matches any of these patterns, the file will be ignored.  
> > Similarly, if the `whitelist` property, which is also an array of strings containing [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)), is set, only the matched files will be supervised by the daemon.  
> >   
> > Note: You can only use **either** the whitelist **or** the blacklist, not both at the same time - else a `TypeError` is thrown.
> > ```ts
> > {
> >     recursive?: true,        // default is false
> >     updateInterval?: 1000,   // default is 500
> >     blacklist?: [ "*.txt" ], // default is []
> >     whitelist?: []           // default is []
> > }
> > ```
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const scl = require("svcorelib");
> > 
> > let dirPath = "./";          // supervises your entire project workspace
> > let blacklist = [ "*.txt" ]; // ignores all files with the extension .txt
> > let recursive = true;        // scans through all subdirectories too
> > let updateInterval = 1000;   // the interval in milliseconds of when to scan all files
> > 
> > let fd = new scl.FolderDaemon(dirPath, blacklist, recursive, updateInterval);
> > 
> > fd.onChanged((err, result) => {
> >     if(err)
> >         console.error(`Error: ${err}`);
> >     else
> >         console.log(`Files have changed:\n- ${result.join("\n- ")}`);
> > });
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION MenuPrompt -->
> ## MenuPrompt
> The class `MenuPrompt` creates an interactive prompt with one or many menus - add them using [`MenuPrompt.addMenu()`](#addmenu)  
> To translate the messages, you can use the [`MenuPromptLocalization`](#menupromptlocalization-object) object, which is where all text variables are stored.  
>   
> ❗ Warning: After creating a MenuPrompt object, the process will no longer exit automatically until the MenuPrompt has finished or was explicitly closed. You have to explicitly use process.exit() until the menu has finished or is closed.  
> ❗ 2nd Warning: Don't log anything to the console or write anything to `process.stdin` while the MenuPrompt is opened as it would completely mess it up.  
>   
> <details><summary><b>Click here to see an example of how this might look like</b></summary>
>   
> ![MenuPrompt example image](https://cdn.sv443.net/scl/docs/menuprompt_tty.gif)
> 
> </details>
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `MenuPrompt`.  
> >   
> > The only parameter `options` can be passed an object of type [`MenuPromptOptions`](#menupromptoptions-object).  
> > Leaving this param empty will make the MenuPrompt use default values.
> > ```ts
> > new MenuPrompt(options?: MenuPromptOptions)
> > ```
> 
> 
> <br><br>
> 
> 
> > ### addMenu()
> > Adds a new menu to the menu prompt.  
> > A single menu prompt can hold a virtually infinite amount of menus.  
> > You can even dynamically add new menus while the MenuPrompt is still open.  
> >   
> > The param `menu` needs to be an object of type [`MenuPromptMenu`](#menupromptmenu-object)  
> >   
> > This method either returns `true` if it was successful or it returns a string containing an error message.
> > ```ts
> > MenuPrompt.addMenu(menu: MenuPromptMenu): boolean | string
> > ```
> 
> 
> <br><br>
> 
> 
> > ### open()
> > Opens the MenuPrompt.  
> > Make sure to add menus to the MenuPrompt using [`MenuPrompt.addMenu()`](#addmenu) before calling this method!  
> > ❗ Warning: While the menu is opened you shouldn't write anything to the console / to the stdout and stderr as this could mess up the layout of the menu and/or make stuff unreadable.
> >   
> > This method either returns `true` if it was successful or it returns a string containing an error message.
> > ```ts
> > MenuPrompt.open(): boolean | string
> > ```
> 
> 
> <br><br>
> 
> 
> > ### close()
> > Closes the MenuPrompt and returns the results of all menus that have been completed up to this point.  
> >   
> > This method returns the results of the MenuPrompt as an array of objects of type [`MenuPromptResult`](#menupromptresult-object)
> > ```ts
> > MenuPrompt.close(): MenuPromptResult[]
> > ```
> 
> 
> <br><br>
> 
> 
> > ### currentMenu()
> > Returns the (zero-based) index of the currently open menu of the MenuPrompt.  
> > If the MenuPrompt hasn't been opened yet, this will return `-1`
> > ```ts
> > MenuPrompt.currentMenu(): number
> > ```
> 
> 
> <br><br>
> > ### result()
> > Returns the current results of the MenuPrompt as an array of objects of type [`MenuPromptResult`](#menupromptresult-object)  
> > This does **not** close the menu prompt, unlike `close()`  
> >   
> > If there aren't any completed menus yet, this method will return `null`
> > ```ts
> > MenuPrompt.result(): MenuPromptResult | null
> > ```
> 
> 
> <br><br>
> 
> 
> > ### validateMenu()
> > Checks a menu object for valid syntax.  
> >   
> > The param `menu` needs to be a single object of type [`MenuPromptMenu`](#menupromptmenu-object)  
> >   
> > The method either returns `true` if the menu is valid or an array of strings containing error messages.
> > ```ts
> > MenuPrompt.validateMenu(menu: MenuPromptMenu): boolean | string[]
> > ```
> 
> 
> <br><br>
> 
> 
> > ### MenuPromptMenu object
> > This specifies a single menu of a MenuPrompt.
> > ```ts
> > {
> >     title: "Example Menu", // the title of the menu
> >     options: [             // an array of options the user can select
> >         {
> >             "key": "1",          // the key the user needs to press to select this option
> >             "description": "Foo" // the name / description of this option
> >         },
> >         {
> >             "key": "2",
> >             "description": "Bar"
> >         },
> >         // ...
> >     ]
> > }
> > ```
> 
> 
> <br><br>
> 
> 
> > ### MenuPromptOptions object
> > This object is used in the constructor of a MenuPrompt.  
> > Here you can specify a few settings that affect all menus of a MenuPrompt.
> > ```ts
> > {
> >     exitKey: string;         // The key or keys that need to be entered to exit the prompt - if left empty, the menu can't be exited with a key
> >     optionSeparator: string; // The separator character(s) between the option key and the option description
> >     cursorPrefix: string;    // Character(s) that should be prefixed to the cursor. Will default to this arrow: "─►"
> >     retryOnInvalid: boolean; // Whether the menu should be retried if the user entered a wrong option - defaults to true - if set to false, continues to next menu when an invalid option was selected
> >     onFinished: function;    // A function that gets called when the user is done with all of the menus of the prompt or entered the exit key(s). The only passed parameter is an array containing all selected option keys
> >     autoSubmit: boolean;     // If set to true, the MenuPrompt will only accept a single character of input and will then automatically submit the current menu - make sure the option keys are only a single character in length! If set to false, the user will have to explicitly press the Enter key to submit a value.
> > }
> > ```
> 
> 
> <br><br>
> 
> 
> > ### MenuPromptResult object
> > This object contains information about what option a user selected in a single menu.  
> > You will only encounter these objects inside of arrays.
> > ```ts
> > {
> >     key: string;         // The key of the selected option
> >     description: string; // The description of the selected option
> >     menuTitle: string;   // The title of the menu
> >     optionIndex: number; // The zero-based index of the selected option
> >     menuIndex: number;   // The zero-based index of the menu
> > }
> > ```
> 
> 
> <br><br>
> 
> 
> > ### MenuPromptLocalization object
> > You can access this object directly on the MenuPrompt with the property `localization` (example is below).
> > ```ts
> > {
> >     wrongOption: string;           // The text that's displayed when a wrong key was pressed
> >     invalidOptionSelected: string; // A different text that's displayed when a wrong key was pressed
> >     exitOptionText: string;        // The name of the exit option
> > }
> > ```
> > 
> > <br><details><summary><b>Example Localization - click to show</b></summary>
> > ```js
> > const scl = require("svcorelib");
> > 
> > /** @type {scl.MenuPromptOptions} */
> > let opts = {
> >     exitKey: "x",
> >     autoSubmit: true,
> >     /** @param {scl.MenuPromptResult[]} res */
> >     onFinished: (res) => {
> >         // if the user selected an option
> >         if(res.length > 0)
> >             console.log(`Finished. Selected option: ${res[0].key} (${res[0].description})`);
> >         else
> >             console.log(`User selected "Exit"`);
> >     }
> > };
> > 
> > let mp = new scl.MenuPrompt(opts);
> > 
> > let menu = {
> >     title: "Example Menu",
> >     options: [
> >         {
> >             key: "1",
> >             description: "Foo"
> >         },
> >         {
> >             key: "2",
> >             description: "Bar"
> >         }
> >     ]
> > };
> > 
> > // Make sure menu is valid
> > let menuValid = mp.validateMenu(menu);
> > if(menuValid)
> > {
> >     // Now that the menu is confirmed to be valid, add it
> >     mp.addMenu(menu);
> > 
> >     // Open the menu
> >     mp.open();
> > }
> > else
> >     console.log(`Error: Menu is invalid.\n${menuValid.join(", ")}`);
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION ProgressBar -->
> ## ProgressBar
> The ProgressBar simply displays a progress bar in the Command Line Interface (CLI).  
> It displays an automatically calculated percentage value and an optional message.  
>   
> <details><summary><b>Click here to see an example of how this might look like</b></summary>
>   
> ![ProgressBar example image](https://cdn.sv443.net/scl/docs/progressbar_tty.gif)
> 
> </details>
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `ProgressBar`.  
> >   
> > The param `timesToUpdate` needs to be passed the number of times you are going to call the method [`next()`](#next).  
> > This parameter is also directly correlated to the length of the progress bar.  
> > The optional parameter `initialMessage` can contain a string that is displayed at 0% progress. If left undefined, no message will appear.
> > ```ts
> > new ProgressBar(timesToUpdate: number, initialMessage?: string)
> > ```
> 
> 
> <br><br>
> 
> 
> > ### next()
> > Increments the progress bar once.  
> > How many times you are going to call this method needs to be known when creating a ProgressBar object as it is needed in the constructor.  
> > This is a fundamental thing about progress bars and I can't change it.  
> >   
> > The optional parameter `message` can be used to display a message next to the progress bar.
> > ```ts
> > ProgressBar.next(message?: string): void
> > ```
> 
> 
> <br><br>
> 
> 
> > ### onFinish()
> > Registers a function to be called when the progress bar reaches 100%.
> > ```ts
> > ProgressBar.onFinish(callback: function): void;
> > ```
> 
> 
> <br><br>
> 
> 
> > ### getProgress()
> > Returns the current progress as a floating-point number between `0.0` and `1.0`
> > ```ts
> > ProgressBar.getProgress(): number;
> > ```
> 
> 
> <br><br>
> 
> 
> > ### getRemainingIncrements()
> > Returns the amount of increments needed to reach 100% progress - aka the amount of times the method [`next()`](#next) needs to be called.
> > ```ts
> > ProgressBar.getRemainingIncrements(): number;
> > ```
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const scl = require("svcorelib");
> > 
> > let pb = new scl.ProgressBar(15, "Doing some stuff (Iteration #0)");
> > 
> > // Register Promise callback to be executed when the progress bar reaches 100%
> > pb.onFinish().then(() => {
> >     console.log("Finished.\n\n");
> > });
> > 
> > // Increment progress bar after a random timeout
> > function iterate(iterations)
> > {
> >     if(iterations < 15)
> >     {
> >         setTimeout(() => {
> >             iterations++;
> >             pb.next(`Doing some stuff (Iteration #${iterations})`);
> > 
> >             iterate(iterations);
> >         }, scl.randRange(200, 400));
> >     }
> > }
> > 
> > iterate(0);
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION SelectionMenu -->
> ## SelectionMenu
> The SelectionMenu allows a user to scroll through a list of options and select one of them.  
>   
> <details><summary><b>Click here to see an example of how this might look like</b></summary>
> 
> ![SelectionMenu example image](https://cdn.sv443.net/scl/docs/selectionmenu_tty.gif)
> 
> </details>
> 
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `SelectionMenu`.  
> > If you want to translate the default texts, use the object [`locale`](#selectionmenulocale-object).  
> >   
> > The optional param `title` specifies a title shown on a line above the options of the SelectionMenu.  
> > With the optional parameter `settings` you can configure the SelectionMenu to your liking. It is explained [here.](#selectionmenusettings-object)  
> >   
> > Throws a `NoStdinError` if the terminal in which the process runs doesn't have a stdin stream or isn't a compatible TTY terminal.
> > ```ts
> > new SelectionMenu(title?: string, settings?: SelectionMenuSettings)
> > ```
> 
> 
> <br><br>
> 
> 
> > ### setOptions()
> > Sets or overwrites the options of the SelectionMenu.  
> >   
> > The parameter `options` needs to be an array of strings containing the text of the options.  
> >   
> > Returns a string containing an error message or `true` if it was successful.
> > ```ts
> > SelectionMenu.setOptions(options: string[]): string | boolean
> > ```
> 
> 
> <br><br>
> 
> 
> > ### addOption()
> > Adds a single option to the SelectionMenu.  
> >   
> > The parameter `option` needs to be a string.  
> >   
> > Returns a string containing an error message or `true` if it was successful.
> > ```ts
> > SelectionMenu.addOption(option: string): string | boolean
> > ```
> 
> 
> <br><br>
> 
> 
> > ### onSubmit()
> > Registers a function to be called SelectionMenu.  
> >   
> > The parameter `callback_fn` can be passed a function to be called when the SelectionMenu is submitted or canceled.  
> > This function gets passed a single parameter of type [SelectionMenuResult.](#SelectionMenuresult-object)  
> >   
> > Returns a promise that resolves with an object of type [SelectionMenuResult](#SelectionMenuresult-object) or rejects with a string containing an error message.
> > ```ts
> > SelectionMenu.onSubmit(callback_fn?: function(SelectionMenuResult){}): Promise<SelectionMenuResult>
> > ```
> 
> 
> <br><br>
> 
> 
> > ### open()
> > Opens the SelectionMenu.  
> > Make sure to add options with `setOptions()` or `addOption()` before calling this method.  
> >   
> > Returns a string containing an error message or `true` if it was successful.
> > ```ts
> > SelectionMenu.open(): string | boolean
> > ```
> 
> 
> <br><br>
> 
> 
> > ### close()
> > Prematurely closes the SelectionMenu.  
> > This will not cause the callback functions that have been registered with `onSubmit()` to be executed.  
> >   
> > Returns a boolean of whether or not the SelectionMenu could be closed.
> > ```ts
> > SelectionMenu.close(): boolean
> > ```
> 
> 
> <br><br><br>
> 
> 
> > ### SelectionMenuSettings object
> > This object is used in the construction of a SelectionMenu object.
> > ```ts
> > {
> >     cancelable: boolean, // Set to false to prevent users from canceling the SelectionMenu - defaults to true
> >     overflow: boolean    // If set to true, if the user scrolls past the end or beginning, this makes the cursor of the menu overflow to the other side - defaults to true
> > }
> > ```
> 
> 
> <br><br>
> 
> 
> > ### SelectionMenuLocale object
> > You can access this object directly on the SelectionMenu with the property `locale` (example is below).
> > ```ts
> > {
> >     escKey: string;    // Shorthand name of the escape key - defaults to "Esc"
> >     cancel: string;    // Cancel text - defaults to "Cancel"
> >     scroll: string;    // Scroll text - defaults to "Scroll"
> >     returnKey: string; // Shorthand name of the return key - defaults to "Return"
> >     select: string;    // Select text - defaults to "Select"
> > }
> > ```
> > 
> > <br><details><summary><b>Example Localization - click to show</b></summary>
> > ```js
> > const scl = require("svcorelib");
> > 
> > let sm = new scl.SelectionMenu();
> > 
> > sm.addOption("Example Option");
> > 
> > sm.locale.cancel = "Exit";
> > sm.locale.returnKey = "↵";
> > 
> > sm.open();
> > ```
> > 
> > </details>
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const scl = require("svcorelib");
> > 
> > let sm = new scl.SelectionMenu("Example SelectionMenu:", {
> >     cancelable: true,
> >     overflow: true
> > });
> > 
> > 
> > // Set first 5 options
> > let setOptionsRes = sm.setOptions([ "Foo", "Bar", "Apple", "Pear", "Banana" ]);
> > 
> > if(typeof setOptionsRes == "string")
> >     console.error(`Error while setting options: ${setOptionsRes}`);
> > 
> > 
> > // Add another option
> > let addOptionRes = sm.addOption("Baz");
> > 
> > if(typeof addOptionRes == "string")
> >     console.error(`Error while adding option: ${addOptionRes}`);
> > 
> > 
> > // Add handler that gets called when the menu is submitted
> > sm.onSubmit().then(res => {
> >     if(res.canceled)
> >         console.log(`User canceled the SelectionMenu`);
> >     else
> >         console.log(`User selected option "${res.option.description}" (index ${res.option.index})`);
> > }).catch(err => {
> >     console.error(`Error while submitting SelectionMenu: ${err}`);
> > });
> > 
> > // Alternatively, use the EventEmitter's .on() method
> > sm.on("submit", (res) => {
> >     if(res.canceled)
> >         console.log(`User canceled the SelectionMenu`);
> >     else
> >         console.log(`User selected option "${res.option.description}" (index ${res.option.index})`);
> > });
> > 
> > 
> > // Open the menu
> > let openRes = sm.open();
> > 
> > if(typeof openRes === "string")
> >     console.error(`Error while opening SelectionMenu: ${openRes}`);
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION StatePromise -->
> ## StatePromise
> This class is a wrapper for the Promise API.  
> It keeps track of the state of the promise it wraps around.
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `StatePromise`  
> >   
> > This class is a wrapper for the Promise API.  
> > It keeps track of the state of the promise it wraps.  
> >   
> > Make sure to call `exec()` to actually execute the passed promise and to retrieve the returned value(s).  
> >   
> > The param `promise` is the promise to wrap around and to extract the state from.  
> >   
> > Throws a `TypeError` if the `promise` parameter is not an instance of the `Promise` class.
> > ```ts
> > new StatePromise(promise: Promise)
> > ```
> 
> 
> <br><br>
> 
> 
> > ### exec()
> > This function actually executes the Promise.  
> >   
> > Returns a new Promise instance (not the one from the constructor) that does however inherit the returned values from the constructor promise.
> > ```ts
> > StatePromise.exec(): Promise
> > ```
> 
> 
> <br><br>
> 
> 
> > ### getState()
> > Returns the state of this Promise, as a string.  
> >   
> > The possible states are:  
> > | State | Description |
> > | :-- | :-- |
> > | `initialized` | The StatePromise instance was created but the `exec()` method wasn't called yet |
> > | `pending` | The promise execution was started but it hasn't been resolved or rejected yet |
> > | `fulfilled` | Execution was finished and the promise was resolved |
> > | `rejected` | Execution was finished but the promise was rejected |
> >   
> > <br>
> > 
> > ```ts
> > SelectionMenu.getState(): "initialized" | "pending" | "fulfilled" | "rejected"
> > ```
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const { StatePromise } = require("svcorelib");
> > 
> > // Promise to wrap around
> > const prom = new Promise((res, rej) => {
> >     // replace `res` with `rej` to test promise rejection
> >     setTimeout(() => res("test123"), 3500);
> > });
> > 
> > const stp = new StatePromise(prom);
> > 
> > console.log("START");
> > 
> > // Execute the StatePromise
> > stp.exec().then((...returnedValues) => {
> >     console.log(`THEN: ${returnedValues}`);
> > }).catch(err => {
> >     console.error(`CATCH: ${err}`);
> > });
> > 
> > 
> > let iter = 0;
> > 
> > const interval = setInterval(() => {
> >     console.log(`Iteration #${iter} - State: ${stp.getState()}`);
> > 
> >     iter++;
> > 
> >     if(iter == 5)
> >         clearInterval(interval);
> > }, 1000);
> > ```
> > 
> > <br>
> > 
> > **Output:**  
> > ```
> > START - State: initialized
> > Iteration #0 - State: pending
> > Iteration #1 - State: pending
> > Iteration #2 - State: pending
> > THEN: test123
> > Iteration #3 - State: fulfilled
> > Iteration #4 - State: fulfilled
> > ```
> > 
> > </details>


<br><br><br><br><br>


<!-- #MARKER Errors -->
## Errors
This class namespace, accessed with `scl.Errors`, contains all of SCL's custom error classes.  
They are used by SCL but feel free to also use these.  
The classes have to be constructed with the `new` keyword.  
  
All of these classes extend from the [base class `SCLError`](#errorssclerror), which in turn extends from the [`Error` class.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)  
The `SCLError` base class adds a property `date`, which is an instance of `Date` and which represents the exact time the error instance was created.

<br><br>


<!-- #SECTION SCLError -->
> ### Errors.SCLError
> This is the base class of all of SCL's Error classes.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `SCLError`  
> >   
> > The param `message` is optional. It contains a more detailed error message.
> > ```ts
> > new Errors.SCLError(message?: string)
> > ```
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const { Errors, colors } = require("svcorelib");
> > 
> > try
> > {
> >     throw new Errors.SCLError("idk, something probably went wrong");
> > }
> > catch(err)
> > {
> >     // SCLError exposes the `date` property, which you can use for logging, debugging, etc.:
> >     console.error(`${colors.fg.red}Error thrown at ${err.date.toString()}: ${colors.rst}${err.toString()}`);
> > }
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION InvalidPathError -->
> ### Errors.InvalidPathError
> This error gets thrown when a provided path is invalid or doesn't exist on the current device.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `InvalidPathError`.  
> >   
> > The param `message` is optional. It contains a more detailed error message.  
> > SCL usually puts the invalid path in this parameter.
> > ```ts
> > new Errors.InvalidPathError(message?: string)
> > ```
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const { filesystem, Errors } = require("svcorelib");
> > const fs = require("fs");
> > const { resolve } = require("path");
> > 
> > 
> > /** @throws InvalidPathError if the provided path doesn't exist */
> > async function throwIfNotExists(path)
> > {
> >     path = resolve(path);
> > 
> >     if(!(await filesystem.exists(path)))
> >         throw new Errors.InvalidPathError(`Path "${path}" doesn't exist.`);
> > 
> >     return;
> > }
> > 
> > async function run()
> > {
> >     await throwIfNotExists("./package.json");           // no error is thrown
> >     await throwIfNotExists("./path/that/doesnt/exist"); // error is thrown here
> > }
> > 
> > run();
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION NotAFolderError -->
> ### Errors.NotAFolderError
> This error gets thrown when a provided path is valid but doesn't point to a folder / directory.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `NotAFolderError`.  
> >   
> > The param `message` is optional. It contains a more detailed error message.  
> > SCL usually puts the invalid path in this parameter.
> > ```ts
> > new Errors.NotAFolderError(message?: string)
> > ```
> 
> 
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
> > const scl = require("svcorelib");
> > const fs = require("fs");
> > const { resolve } = require("path");
> > 
> > 
> > /** @throws NotAFolderError if the provided path doesn't point to a folder */
> > function pathIsFolder(path)
> > {
> >     path = resolve(path);
> > 
> >     if(!fs.statSync(path).isDirectory())
> >         throw new scl.Errors.InvalidPathError(`Path "${path}" doesn't point to a folder.`);
> > 
> >     return;
> > }
> > 
> > pathIsFolder("./src");          // no error is thrown
> > pathIsFolder("./SvCoreLib.js"); // error is thrown here
> > ```
> > 
> > </details>


<br><br><br>


<!-- #SECTION PatternInvalidError -->
> ### Errors.PatternInvalidError
> This error gets thrown when a provided glob pattern is invalid.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `PatternInvalidError`.  
> >   
> > The param `message` is optional. It contains a more detailed error message.  
> > SCL usually puts the invalid pattern in this parameter.
> > ```ts
> > new Errors.PatternInvalidError(message?: string)
> > ```


<br><br><br>


<!-- #SECTION NoStdinError -->
> ### Errors.NoStdinError
> This error gets thrown when the terminal that the process runs in doesn't provide an stdin channel.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `NoStdinError`.  
> >   
> > The param `message` is optional. It contains a more detailed error message.
> > ```ts
> > new Errors.NoStdinError(message?: string)
> > ```


<br><br><br>


<!-- #SECTION InvalidMimeTypeError -->
> ### Errors.InvalidMimeTypeError
> This error gets thrown when an invalid [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) was provided.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `InvalidMimeTypeError`.  
> >   
> > The param `message` is optional. It contains a more detailed error message.
> > ```ts
> > new Errors.InvalidMimeTypeError(message?: string)
> > ```


<br><br><br>


<!-- #SECTION SqlConnectionNotEstablishedError -->
> ### Errors.SqlConnectionNotEstablishedError
> This error gets thrown when a SQL database connection was not established yet or errored out.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `SqlConnectionNotEstablishedError`.  
> >   
> > The param `message` is optional. It contains a more detailed error message.  
> > In SCLs case, this parameter contains the current connection state of the DB connection.
> > ```ts
> > new Errors.SqlConnectionNotEstablishedError(message?: string)
> > ```


<br><br><br><br><br>

<!-- #MARKER Objects -->
# Objects
This section contains all of SCLs objects.  
These are read-only, static and passive properties and will not invoke or change anything.  


<br>


<!-- #SECTION colors -->
> ### colors
> This object can be used to color text in the Command Line Interface (CLI).  
> Since typing `scl.colors.xy.color_name` can be quite long, I recommend declaring one or multiple variables like shown in the example code below.
> ```ts
> scl.colors
> ```
> 
> **Supported colors are:**
> | Color | SCL |
> | --- | --- |
> | ❌ Reset to default | `scl.colors.rst` or `scl.colors.fg.rst` or `scl.colors.bg.rst` |
> | 🍩 Fat Font | `scl.colors.fat` |
> | 💡 Blinking | `scl.colors.blink` |
> | ⚫️ Black Text | `scl.colors.fg.black` |
> | ⚫️ Black Background | `scl.colors.bg.black` |
> | 🟥 Red Text | `scl.colors.fg.red` |
> | 🟥 Red Background | `scl.colors.bg.red` |
> | 🟩 Green Text | `scl.colors.fg.green` |
> | 🟩 Green Background | `scl.colors.bg.green` |
> | 🟨 Yellow Text | `scl.colors.fg.yellow` |
> | 🟨 Yellow Background | `scl.colors.bg.yellow` |
> | 🟦 Blue Text | `scl.colors.fg.blue` |
> | 🟦 Blue Background | `scl.colors.bg.blue` |
> | 🟪 Magenta Text | `scl.colors.fg.magenta` |
> | 🟪 Magenta Background | `scl.colors.bg.magenta` |
> | 🔷 Cyan Text | `scl.colors.fg.cyan` |
> | 🔷 Cyan Background | `scl.colors.bg.cyan` |
> | ⚪️ White Text | `scl.colors.fg.white` |
> | ⚪️ White Background | `scl.colors.bg.white` |
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> const { fg, bg } = scl.colors;
> 
> console.log(`${scl.colors.fat}Foreground Colors:  ${fg.green}Green${fg.rst} ${fg.magenta}Magenta${fg.rst} ${fg.blue}Blue${fg.rst} ${fg.cyan}Cyan${fg.rst}`);
> console.log(`${scl.colors.fat}Background Colors:  ${bg.green}Green${fg.rst} ${bg.magenta}Magenta${fg.rst} ${bg.blue}Blue${fg.rst} ${bg.cyan}Cyan${bg.rst}`);
> ```
> 
> </details>


<br><br><br>


> ### info
> This object offers a few read-only bits of information about SCL, like the version number or license.  
> ```ts
> scl.info
> ```
> 
> **Properties:**
> | Property | Type | Description |
> | --- | --- | --- |
> | `scl.info.version` | `string` | SCLs current version, as a semver-compatible string |
> | `scl.info.intVersion` | `number[]` | SCLs version, as an array of numbers, for better usability within code |
> | `scl.info.name` | `string` | The name of SCL (who knows, maybe it'll change eventually) |
> | `scl.info.desc` | `string` | A short description of what SCL is and does |
> | `scl.info.author` | `string` | The name of the author of SCL (currently `Sv443`) |
> | `scl.info.authorLong` | `string` | The authors name, email address and homepage in this format: `Name <Email> (URL)` |
> | `scl.info.contributors` | `object[]` | The `contributors` property of SCLs `package.json` file |
> | `scl.info.license` | `string` | The license and URL to the license text of SCL in the format `License (URL)` |
> | `scl.info.documentation` | `string` | A URL to SCLs documentation |
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const scl = require("svcorelib");
> 
> if(scl.info.intVersion[0] < 1 && scl.info.intVersion[1] < 12)
>     console.error(`This code needs ${scl.info.name} v1.12.x or higher to run!\nHow to install the latest version: ${scl.info.documentation}#installation`);
> ```
> 
> </details>


<br><br><br><br><br>


# Legal Information
This is where you can find all legal information about SCL and the Sv443 Network.

<br>

## License
SvCoreLib is licensed under the MIT license. You can view the full license text by [clicking here.](https://sv443.net/LICENSE)  
  
Below is a short summary of the license (it is not legal advice though):  
### ✅ You can:
- use this library anywhere
- copy the source code of the library
- modify the source code of the library
- merge the source code with other code
- publish and distribute the code (even under a different license)
- monetize or sell the code or projects that contain the code
### ❌ You cannot:
- remove the `LICENSE.txt` file from the finished product. It has to be contained in every distribution of your product and accessible by the end user
- publish the code without modifying it and claim it as your own
- modify the code, publish it and then claim it as your own (and no-one else's)
- claim any warranty. This software is provided "as is"
- demand any liability from the author(s) and contributors

<br>

## Disclaimer
I will hereby not claim any legal responsibility or liability for SvCoreLib. Whether it is used maliciously or breaks something, I can't be held accountable.  
I am doing my best to ensure security and stability but there's only so much a single developer can do.  
Security patches are created as soon as possible but I don't have any binding responsibility to make these patches.  
Please create a backup before using this library if you want to be extra secure and report any issue that may arise to the [GitHub issue tracker](https://github.com/Sv443-Network/SvCoreLib/issues/new/choose) and I will try my best to fix it as soon as possible.

<br>

## Privacy Policy
[Click here to view the privacy policy.](https://sv443.net/privacypolicy/en)

<br>

## Security Policy
[Click here to view the security policy.](./.github/SECURITY.md)


<br><br><br><br>


<div align="center" style="text-align: center">

Made with ❤️ by [Sv443](https://github.com/Sv443)  
Please consider [supporting me](https://github.com/sponsors/Sv443)

</div>

<br><br><br><br><br><br><br><br>
