# SvCoreLib - Documentation
This is the documentation of SvCoreLib (referred to as SCL)

<br>

<!-- #MARKER ToC -->
## Table of Contents:
- **[Installation](#installation)**
- **[Usage](#usage)**
- **[In-IDE Documentation](#in-ide-documentation)**
- **[Functions](#functions)**
    - [File System](#file-system)
        - [filesystem.logger()](#filesystemlogger)
        - [filesystem.readdirRecursive()](#filesystemreaddirrecursive)
        - [filesystem.readdirRecursiveSync()](#filesystemreaddirrecursivesync)
        - [filesystem.downloadFile()](#filesystemdownloadfile)
    - [Generate UUID](#generate-uuid)
        - [generateUUID.alphanumerical()](#generateuuidalphanumerical)
        - [generateUUID.binary()](#generateuuidbinary)
        - [generateUUID.custom()](#generateuuidcustom)
        - [generateUUID.decimal()](#generateuuiddecimal)
        - [generateUUID.hexadecimal()](#generateuuidhexadecimal)
    - [HTTP](#http)
        - [http.getClientEncoding()](#httpgetclientencoding)
        - [http.pipeFile()](#httppipefile)
        - [http.pipeString()](#httppipestring)
    - [Seeded RNG](#seeded-rng)
        - [seededRNG.generateRandomSeed()](#seededrnggeneraterandomseed)
        - [seededRNG.generateSeededNumbers()](#seededrnggenerateseedednumbers)
        - [seededRNG.validateSeed()](#seededrngvalidateseed)
    - [Other](#other)
        - [allEqual()](#allequal)
        - [byteLength()](#bytelength)
        - [error()](#error)
        - [inDebugger()](#indebugger)
        - [isArrayEmpty()](#isarrayempty)
        - [isEmpty()](#isempty)
        - [mapRange()](#maprange)
        - [noShutdown()](#noshutdown)
        - [pause()](#pause)
        - [ping()](#ping)
        - [randomItem()](#randomitem)
        - [randomizeArray()](#randomizearray)
        - [randRange()](#randrange)
        - [readableArray()](#readablearray)
        - [removeDuplicates()](#removeduplicates)
        - [replaceAt()](#replaceat)
        - [reserialize()](#reserialize)
        - [softShutdown()](#softshutdown)
        - [unused()](#unused)
        - [yesShutdown()](#yesshutdown)
- **[Classes](#classes)**
    - [FolderDaemon](#folderdaemon)
    - [MenuPrompt](#menuprompt)
    - [ProgressBar](#progressbar)
    - [SelectionMenu](#SelectionMenu)
    - [Errors](#errors)
        - [InvalidPathError](#errorsinvalidpatherror)
        - [NotAFolderError](#errorsnotafoldererror)
        - [PatternInvalidError](#errorspatterninvaliderror)
        - [NoStdinError](#errorsnostdinerror)
        - [InvalidMimeTypeError](#errorsinvalidmimetypeerror)
- **[Objects](#objects)**
    - [colors](#colors)
    - [info](#info)
- **[Legal Information](#legal-information)**
    - [License](#license)
    - [Disclaimer](#disclaimer)
    - [Privacy Policy](#privacy-policy)
    - [Security Policy](#security-policy)
    - [Site Notice / Impressum](#site-notice)

<br><br><br><br><br>

<!-- #MARKER Installation -->
# Installation
To install SvCoreLib (SCL), use the following command in a terminal inside your Node.js project:  
```
npm i svcorelib
```
Troubleshooting: Make sure your workspace contains a `package.json` file. If not, use `npm init` to initialize your workspace with npm.  

<br><br><br><br><br>

<!-- #MARKER Usage -->
# Usage
This explains how you can use SCL in your project.  
  
If your project runs on "normal" Node.js (or CommonJS), use the following at the top of the file you want to include SCL:
```js
const scl = require("svcorelib");
```
If your project runs on TypeScript, replace the above with this:
```ts
import * as scl from "svcorelib";
```

<br>

The variable `scl` now contains all of SCL's functions, classes and objects.

<br><br><br><br><br>

<!-- #MARKER In-IDE Documentation -->
# In-IDE Documentation
SCL uses a TypeScript type declaration file (`.d.ts`) in order to provide documentation directly in your IDE.  
<details><summary><b>Click here to see an example of how it looks like in Visual Studio Code</b></summary>
  
![(Image)](https://cdn.sv443.net/scl/docs/jsdoc_ide.gif)

</details>
  
---

<br>

- Each piece of documentation will have a description. It is delimited from other sections by this emoji: 🔹
- If you are looking at a subsection, for example [`scl.filesystem`](#filesystem), its description will be marked with this emoji: 🔸
- Some of the functions / methods have special quirks to look out for or will be deprecated. This warning section is delimited from other sections with this emoji: ❗
- Deprecated features should be unlisted in your IDE but if not or you explicitly entered their name, they are indicated with a `@deprecated` tag and they will contain this emoji: ❌. Their descriptions should also tell you if there are alternatives.
- You will always encounter a `@since` tag, which indicates with which version the feature was introduced.
- The `@version` tag will tell you that something changed in a certain version.
- If a function / method can throw an error, the `@throws` tag will tell you when this might happen and of which class the Error might be.
- Private class methods should be unlisted but if not, they will start with an underscore, will be tagged with `@private` and their description will be delimited from other sections with this emoji: ❌. Private methods shouldn't be used, or else something might break.

<br><br><br><br><br>

<!-- #MARKER Functions -->
# Functions
This section tells you all about the static functions SCL offers.  
You have to call these without the `new` keyword.  

<br>

<!-- #SECTION File System -->
## File System
This subsection, accessed with `scl.filesystem`, contains a few file-related functions.

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
> Basically the same thing as [filesystem.readdirRecursive()](#filesystemreaddirrecursive), but this function blocks code execution, thus making it synchronous.  
>   
> ❗ This function is more resource-heavy than the asynchronous [filesystem.readdirRecursive()](#filesystemreaddirrecursive) so it is recommended that you try to use the async function over this synchronous one.
> ```ts
> scl.filesystem.readdirRecursiveSync(folder: string): string[]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
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


<br><br><br><br>


<!-- #SECTION Generate UUID -->
## Generate UUID
This subsection, accessed with `scl.generateUUID`, offers a few functions to generate Universally Unique Identifiers (UUIDs).  
  
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
> The parameter `possibleValues` needs to be a string of characters that should be used to generate the UUID.  
> These characters need no separator.  
> Example: `"abc!?"` could produce something similar to this: `"ba!a-c?a!"`.
> ```ts
> scl.generateUUID.custom(uuidFormat: string, possibleValues: string): string
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> let foo = scl.generateUUID.custom("xxxx-yyyy", "abcd#+_!");
> let bar = scl.generateUUID.custom("xxxx-yyyy", "12"); // binary system using 1s and 2s maybe? 👀
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
> let uuid = scl.generateUUID.hexadecimal("xxxx-yyyy", true);
> 
> console.log(uuid); // "F6B6-EFA3"
> ```
> 
> </details>


<br><br><br><br>


<!-- #SECTION HTTP -->
## HTTP
This subsection, accessed with `scl.http`, offers functions that make using Node's builtin `http` and `https` modules and third-party packages based on them easier to use.  


<br><br>


> ### http.getClientEncoding()
> This function parses the `Accept-Encoding` header of a clien't request and returns the most efficient and modern encoding methods the client supports. 
> Currently supported encoding methods (sorted by priority, highest priority first) are:  
> - `br` ([Brotli](https://en.wikipedia.org/wiki/Brotli))  
> - `gzip` ([Gzip / Lempel-Ziv / LZ77](https://en.wikipedia.org/wiki/Gzip))  
> - `deflate` ([Deflate](https://en.wikipedia.org/wiki/DEFLATE))  
> - `compress` ([Lempel-Ziv-Welch / LZW](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Welch))  
> - `identity` (No Encoding / Raw Data)  
>   
> If no header was provided or the client doesn't support any encodings, `"identity"` is returned, meaning the client wants the original, non-encoded data.  
> ```ts
> scl.http.getClientEncoding(req: http.IncomingMessage): string
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
>         let clientEncoding = scl.http.getClientEncoding(req);
> 
>         console.log(clientEncoding); // "gzip"
>     }
> }).listen(80, null, err => {
>     if(err)
>         console.error(`Error while setting up HTTP server: ${err}`);
>     else
>         console.log(`HTTP server listening at 127.0.0.1:80`);
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
> }).listen(80, null, err => {
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
> The `statusCode` parameter needs to be passed a [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) number. If left empty, this will default to `200`.
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
> }).listen(80, null, err => {
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
> scl.http.ping("https://example.org/", 5000)
> .then(res => {
>     console.log(`Status ${res.statusCode} (${res.statusMessage}) - Ping: ${res.responseTime}ms`); // Status 200 (OK) - Ping: 526ms
> })
> .catch(err => console.error(`Error while pinging URL: ${err}`));
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
This subsection, accessed with `scl.seededRNG`, offers a few functions to generate numbers based on a seed.  
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
> ```ts
> scl.seededRNG.validateSeed(seed: number | string): boolean
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
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


<!-- #SECTION Other -->
## Other
This subsection, accessed with just `scl`, offers many miscellaneous functions.  


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
> const { resolve } = require("path");
> 
> scl.error("Couldn't establish a connection to the API", resolve("./errors/fatal.log"), true, 1);
> // Logs a red message to the console, puts it in the log file at "./errors/fatal.log", then exits the process with code 1
> ```
> 
> </details>


<br><br><br>


> ### inDebugger()
> Checks if the process is currently running in the debugger environment.  
> This can be useful because some features like child processes and reading from stdin do not work in most debuggers.  
> Should support all major Node.js debuggers.  
> Returns `true` if the current process runs in a debugger environment - else returns `false`
> ```ts
> scl.inDebugger(): boolean
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> if(!scl.inDebugger())
> {
>     // SCLs MenuPrompt doesn't work in some debuggers since it needs to read from process.stdin
>     let mp = new scl.MenuPrompt();
>     // ...
> }
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
> Returns true, if the input is undefined, null, an empty string, an empty array or an object with length = 0.  
> Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed!
> ```ts
> scl.isArrayEmpty(array: any[]): boolean | number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
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
> let foo = scl.mapRange(10, 0, 100, 0, 10);
> let bar = scl.mapRange(3, 0, 10, 0, 50);
> 
> console.log(foo); // 1
> console.log(bar); // 15
> ```
> 
> </details>


<br><br><br>


> ### noShutdown()
> Prevents the process from being shut down.  
> This can prevent people from exiting the process using CTRL+C.  
> Using `process.exit()` in your script will still exit the process though!  
> If you want the process to be able to be shut down again, use [`scl.yesShutdown()`](#yesshutdown).
>   
> Note: this only listens for the signals "SIGINT" and "SIGTERM".  
> Due to many OSes not supporting it, using "SIGKILL" will still kill the process.
> ```ts
> scl.noShutdown(): void
> ```


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
> Randomizes of an array and returns it.
> ```ts
> scl.randomizeArray(array: any[]): any[]
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
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
> `Highly random` means that contrary to `Math.random()` which uses a seed, this RNG additionally uses a timestamp to calculate the number, making it much more random.  
>   
> Specify the upper and lower boundary with the parameters `min` and `max`  
>   
> ❗ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function!
> ```ts
> scl.randRange(min: number, max: number): number
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> let foo = scl.randRange(0, 100);
> let bar = scl.randRange(0, 100);
> 
> console.log(foo); // 62
> console.log(bar); // 14
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
> let array = scl.removeDuplicates([ 1, 2, 4, 3, 3, 1, 3 ]);
> 
> console.log(array); // [ 1, 2, 4, 3 ]
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


> ### softShutdown()
> Executes a synchronous function before the process is exited.
> ```ts
> scl.softShutdown(funct: function, code?: number): void
> ```
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> console.log("foo");
> 
> scl.softShutdown(() => {
>     console.log("Bye!");
>     // async functions can't be used in here
> });
> 
> setTimeout(() => process.exit(), 500);
> 
> console.log("bar");
> ```
>   
> Output:
> ```
> foo
> bar
> Bye!
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
> let my_unused_var = "Hello, World!"; // linter doesn't warn you about this line when using unused()
> 
> scl.unused(my_unused_var);
> ```
> 
> </details>


<br><br><br>


> ### yesShutdown()
> Removes the script shut down prevention that was previously enabled with [`scl.noShutdown()`](#noshutdown).
> ```ts
> scl.yesShutdown(): void
> ```


<br><br><br><br><br>

<!-- #MARKER Classes -->
# Classes
This section contains all of SCLs classes.  
If you don't know about Object Oriented Programming in JavaScript, you can learn about it [here.](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)  
These need to be created with the `new` keyword and constructing multiple objects of these classes will not make them interfere with each other.


<br>


<!-- #SECTION FolderDaemon -->
> ### FolderDaemon
> The FolderDaemon supervises a directory and optionally its subdirectories and executes a callback function if one or more of the files have changed.  
> `changed` means if a file's content has changed, a file has been removed or a file has been added.
> 
> 
> <br><br>
> 
> 
> > ### Constructor
> > Constructs a new object of the class `FolderDaemon`.  
> >   
> > Specify the path to the directory you want to supervise with the param `dirPath`.  
> > The param `filesBlacklist` can be passed an array of strings which contain [glob patterns.](https://en.wikipedia.org/wiki/Glob_(programming)) If a file matches any of these patterns, the file will be ignored.  
> > If you set `recursive` to `true`, the FolderDaemon will recursively look through all subdirectories of the specified directory.  
> > The `updateInterval` parameter can be used to set an interval at which the daemon should check all files. Defaults to `500` ms - set to `0` to disable the interval, then call `intervalCall()` to manually scan the directory.
> > ```ts
> > new FolderDaemon(dirPath: string, filesBlacklist?: string[], recursive?: boolean, updateInterval?: number)
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
> > FolderDaemon.onChanged(callback_fn: (error: null | string, daemonResult: string[]) => {}): Promise<string[]>
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
> <br><br><br>
> 
> 
> > **<details><summary>Example Code - Click to view</summary>**
> > 
> > ```js
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
> ### MenuPrompt
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
> ### ProgressBar
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
> ### SelectionMenu
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
> > The parameter `options` needs to be an array of strings containing the text of the options.  
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
> > 
> > // Open the menu
> > let openRes = sm.open();
> > 
> > if(typeof openRes == "string")
> >     console.error(`Error while opening SelectionMenu: ${openRes}`);
> > ```
> > 
> > </details>


<br><br><br><br><br>


<!-- #SECTION File System -->
## Errors
This subsection, accessed with `scl.Errors`, contains all of SCL's custom error classes.  
They are used by SCL but feel free to also use these.  
The classes have to be constructed with the `new` keyword.  
Also, all of these classes inherit from [JavaScript's `Error` class.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

<br><br>

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
> > const scl = require("svcorelib");
> > const fs = require("fs");
> > const { resolve } = require("path");
> > 
> > 
> > /** @throws InvalidPathError if the provided path doesn't exist */
> > function pathExists(path)
> > {
> >     path = resolve(path);
> > 
> >     if(!fs.existsSync(path))
> >         throw new scl.Errors.InvalidPathError(`Path "${path}" doesn't exist.`);
> > 
> >     return;
> > }
> > 
> > pathExists("./src/");                   // no error is thrown
> > pathExists("./path/that/doesnt/exist"); // error is thrown here
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
> | Reset (Usually white text on black BG) | `scl.colors.rst` or `scl.colors.fg.rst` or `scl.colors.bg.rst` |
> | Fat Font | `scl.colors.fat` |
> | Blinking | `scl.colors.blink` |
> | Black Text | `scl.colors.fg.black` |
> | Black Background | `scl.colors.bg.black` |
> | Red Text | `scl.colors.fg.red` |
> | Red Background | `scl.colors.bg.red` |
> | Green Text | `scl.colors.fg.green` |
> | Green Background | `scl.colors.bg.green` |
> | Yellow Text | `scl.colors.fg.yellow` |
> | Yellow Background | `scl.colors.bg.yellow` |
> | Blue Text | `scl.colors.fg.blue` |
> | Blue Background | `scl.colors.bg.blue` |
> | Magenta Text | `scl.colors.fg.magenta` |
> | Magenta Background | `scl.colors.bg.magenta` |
> | Cyan Text | `scl.colors.fg.cyan` |
> | Cyan Background | `scl.colors.bg.cyan` |
> | White Text | `scl.colors.fg.white` |
> | White Background | `scl.colors.bg.white` |
> 
> <br><details><summary><b>Example Code - click to show</b></summary>
> 
> ```js
> const fgc = scl.colors.fg;
> const bgc = scl.colors.bg;
> 
> console.log(`${scl.colors.fat}Foreground Colors:  ${fgc.green}Green${fgc.rst} ${fgc.magenta}Magenta${fgc.rst} ${fgc.blue}Blue${fgc.rst} ${fgc.cyan}Cyan${fgc.rst}`);
> console.log(`${scl.colors.fat}Background Colors:  ${bgc.green}Green${fgc.rst} ${bgc.magenta}Magenta${fgc.rst} ${bgc.blue}Blue${fgc.rst} ${bgc.cyan}Cyan${bgc.rst}`);
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
> | `scl.info.intVersion` | `number[]` | SCLs version, as an array of numbers, for easier reading |
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
> if(scl.info.intVersion[0] < 1 && scl.info.intVersion[1] < 10)
>     console.error(`This code needs ${scl.info.name} v1.10.x or higher to run!\nHow to install the latest version: ${scl.info.documentation}#installation`);
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
Please create a backup before using this library if you want to be extra secure and report any issue that may arise to the [GitHub issue tracker](https://github.com/Sv443/SvCoreLib/issues/new/choose) and I will try my best to fix it as soon as possible.

<br>

## Privacy Policy
[Click here to view the privacy policy.](https://sv443.net/privacypolicy/en)

<br>

## Security Policy
[Click here to view the security policy.](./.github/SECURITY.md)

<br>

## Site Notice
[Click here to view the site notice / Impressum.](https://sv443.net/imprint/en)


<br><br><br><br>

<div align="center" style="text-align: center">

Made with ❤️ by [Sv443](https://github.com/Sv443)  
Please consider [supporting me](https://github.com/sponsors/Sv443)

</div>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
