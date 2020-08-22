# SvCoreLib - Documentation
This is the documentation of SvCoreLib (also referred to as SCL)

<br>

<!-- #MARKER ToC -->
## Table of Contents:
- [Installation](#installation)
- [Usage](#usage)
- [In-IDE Documentation](#in-ide-documentation)
- [Functions](#functions)
    - [File System](#file-system)
        - [filesystem.logger()](#filesystemlogger)
        - [filesystem.readdirRecursive()](#filesystemreaddirrecursive)
        - [filesystem.readdirRecursiveSync()](#filesystemreaddirrecursivesync)
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
    - [allEqual()](#allequal)
    - [byteLength()](#bytelength)
    - [downloadFile()](#downloadfile)
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
- [Classes](#classes)
    - [FolderDaemon](#folderdaemon)
    - [MenuPrompt](#menuprompt)
    - [ProgressBar](#progressbar)
- [Objects](#objects)
    - [colors](#colors)
    - [info](#info)
- [Legal Information](#legal-information)

<br><br><br><br><br>

<!-- #MARKER Installation -->
# Installation
To install SCL, use the following command in a terminal inside your Node.js project:  
```
npm i svcorelib
```
Troubleshooting: Make sure your workspace conains a `package.json` file. If not, use `npm init` to initialize your workspace with npm.  

<br><br><br><br><br>

<!-- #MARKER Usage -->
# Usage
This explains how you can use SCL in your project.  
  
If your project runs on "normal" Node.js (or CommonJS), use the following at the top of the file you want to include SCL in:
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
Here is an example of how it looks in [Visual Studio Code](https://code.visualstudio.com/):  
<div align="center" style="text-align: center">
  
![(Image)](https://sv443.net/cdn/jsl/doc/jsdoc_ide.png)
  
</div><!-- TODO: re-take image -->
  
---
  
- Each piece of documentation will have a description. It is delimited from other sections by this emoji: 🔹
- Some of the functions / methods have special quirks to look out for or will be deprecated. This warning section is delimited from other sections with this emoji: ⚠️
- Deprecated features should be unlisted but if not, they are indicated with a `@deprecated` tag.
- You will always encounter a `@since` tag, which indicates with which version the feature was introduced.
- The `@version` tag will tell you that something changed in a certain version.
- If a function / method can throw an error, the `@throws` tag will tell you when this might happen and of which class the Error might be.
- Private class methods should be unlisted but if not, they will start with an underscore, will be tagged with `@private` and their description will be delimited from other sections with this emoji: ❌. Private methods shouldn't be used, or else something might break.

<br><br><br><br><br>

<!-- #MARKER Functions -->
# Functions
This section tells you all about the static functions SCL offers.  
You can call these without the `new` keyword.  

<br>

<!-- #SECTION File System -->
## File System
This object, accessed with `scl.filesystem`, contains a few file-related functions.

<br><br>

> ### filesystem.logger()
> This function logs a message to a file
> ```ts
> scl.filesystem.logger(path: string[, content: string, options: LoggerOptions]): void
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
> scl.filesystem.readdirRecursive(folder: string[, callback: function]): Promise<string[]>
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
> ⚠️ This function is more resource-heavy than the asynchronous [filesystem.readdirRecursive()](#filesystemreaddirrecursive) so it is recommended that you try to use the async function over this synchronous one.
> ```ts
> scl.filesystem.readdirRecursive(folder: string[, callback: function]): Promise<string[]>
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


<br><br><br><br>


<!-- #SECTION Generate UUID -->
## Generate UUID
This object, accessed with `scl.generateUUID`, offers a few functions to generate Universally Unique Identifiers (UUIDs).  
  
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
> scl.generateUUID.alphanumerical(uuidFormat: string[, upperCase: boolean]): string
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
> If the parameter `asBooleanArray` is set to `true`, the resulting UUID will be an array of booleans. Any characters that aren't `x` or `y` will then be ignored.
> ```ts
> scl.generateUUID.binary(uuidFormat: string[, asBooleanArray: boolean]): string | boolean[]
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
> scl.generateUUID.hexadecimal(uuidFormat: string[, upperCase: boolean]): string
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
This object, accessed with `scl.http`, offers functions that make using Node's builtin `http` and `https` modules easier to use.  


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
> scl.http.getClientEncoding(req: http.IncomingMessage | https.IncomingMessage): string
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
> scl.http.pipeFile(res: http.ServerResponse, filePath: string[, mimeType: string, statusCode: number]): null | string
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
> scl.http.pipeString(res: http.ServerResponse, text: string[, mimeType: string, statusCode: number]): null | string
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









<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
