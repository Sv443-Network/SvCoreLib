## SvCoreLib
### Version [1.12.0](#1120)

<br><br>

## Version History:
- [1.12.0](#1120)
- [1.11.1](#1111)
- [1.11.0](#1110)
- [1.10.0](#1100)

<br>

---

<br>


## 1.12.0
### FolderDaemon Fix
- Fixed bugs
    - FolderDaemon didn't work when blacklist pattern array was empty ([issue #6](https://github.com/Sv443/SvCoreLib/issues/6))
    - FolderDaemon didn't call onChanged when file was reset to a previously known file content ([issue #7](https://github.com/Sv443/SvCoreLib/issues/7))
- Added SCL's custom error classes to new namespace `scl.Errors`
- Fixed a lot of mistakes in the documentation

<br>

## 1.11.1
- My dumbass left some debug text in

<br>

## 1.11.0
### The SelectionMenu update
- Added the class `SelectionMenu` to create a menu with a scrollable list of options a user can select
- Added the function `allOfType()` to see if all items of an array are of a specified type

<br>

## 1.10.0
### The initial release
- Added all features from JSLib-npm v1.9.4
- Added a TypeScript type declaration file so the in-IDE documentation and type safety is even better than before (thanks to @canarado)
- Added the class `FolderDaemon` to supervise a directory for changed files
- Added functions
    - `reserialize()` to copy a JSON-compatible object by value and lose the reference
    - `byteLength()` to return the length of a string in bytes
    - `http.pipeString()` to stream a string into an http request
    - `http.pipeFile()` to stream a file into an http request
    - `http.getClientEncoding()` to get the encoding method a client requested
- Added the `rst` property to `colors.fg` and `colors.bg`
- Remade the documentation to be a bit more clear and better structured (thanks to @ThatCopy for helping)
