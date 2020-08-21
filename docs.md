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
> [(click to link to this header)](#filesystemlogger)  
>   
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
> [(click to link to this header)](#filesystemreaddirrecursive)  
>   
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
> [(click to link to this header)](#filesystemreaddirrecursivesync)  
>   
> Basically the same thing as [filesystem.readdirRecursive()](#filesystemreaddirrecursives), but this function blocks code execution, thus making it synchronous.  
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


<br><br><br>

