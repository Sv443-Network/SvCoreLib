//#MARKER typedefs
/**
 * @typedef {Object} MenuPromptMenuOption
 * @prop {String} key The key(s) that need(s) to be pressed to select this option
 * @prop {String} description The description of this option
 */

/**
 * @typedef {Object} MenuPropmtMenu
 * @prop {String} title The title of this menu
 * @prop {Array<MenuPromptMenuOption>} options An array of options for this menu
 */

/**
 * @typedef {Object} MenuPromptOptions The options of the menu prompt
 * @prop {String} [exitKey="x"] The key or keys that need to be entered to exit the prompt
 * @prop {String} [optionSeparator=")"] The separator character(s) between the option key and the option description
 * @prop {String} [cursorPrefix="─►"] Character(s) that should be prefixed to the cursor. Will default to this arrow: "─►"
 * @prop {Boolean} [retryOnInvalid=true] Whether the menu should be retried if the user entered a wrong option - if false, continues to next menu
 * @prop {MenuPromptOnFinishedCallback} [onFinished] A function that gets called when the user is done with all of the menus of the prompt or entered the exit key(s). The only passed parameter is an array containing all selected option keys
 * @prop {Boolean} [autoSubmit] If set to true, the MenuPrompt will only accept a single character of input and will then automatically submit the value. If set to false, the user will have to explicitly press the Enter key to submit a value
 */

/**
 * @callback MenuPromptOnFinishedCallback A callback that gets executed once the MenuPrompt has finished
 * @param {Array<MenuPromptResult>} results The results of the MenuPrompt (an array containing objects) - will be an empty array if there aren't any results
 */

/**
 * @typedef {Object} MenuPromptResult The results of the menu prompt
 * @prop {String} key The key of the selected option
 * @prop {String} description The description of the selected option
 * @prop {String} menuTitle The title of the menu
 * @prop {Number} optionIndex The zero-based index of the selected option
 * @prop {Number} menuIndex The zero-based index of the menu
 */

 /**
  * 🔹 Creates an interactive prompt with one or many menus - add them using `MenuPrompt.addMenu()`.
  * To translate the messages, you can use the `MenuPrompt.localization` object, which is where all localization variables are stored. 🔹
  * ⚠️ Warning: Make sure to use the `new` keyword to create an object of this class - example: `let mp = new svc.MenuPrompt()` ⚠️
  * @class
  * @since 1.8.0
  */
//#MARKER constructor
const MenuPrompt = class {
    /**
     * 🔹 Creates an interactive prompt with one or many menus - add them using `MenuPrompt.addMenu()`.
     * To translate the messages, you can use the `MenuPrompt.localization` object, which is where all localization variables are stored. 🔹
     * ⚠️ Warning: After creating a MenuPrompt object, the process will no longer exit automatically until the MenuPrompt has finished or was explicitly closed. You have to explicitly use process.exit() until the menu has finished or is closed
     * @param {MenuPromptOptions} options The options for the prompt
     * @returns {(Boolean|String)} Returns true, if the MenuPrompt was successfully created, a string containing the error message, if not
     * @constructor
     * @since 1.8.0
     * @version 1.8.2 Removed second parameter - use `MenuPrompt.addMenu()` instead
     * @version 1.9.0 The construction of a MenuPrompt object will now set the process.stdin raw mode to true + There is now a `localization` property you can use to translate some messages
     */
    constructor(options)
    {
        let isEmpty = require("../functions/isEmpty");
        let readline = require("readline");
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this._rl.pause();

        this._closed = false;
        this._active = false;

        if(isEmpty(options))
        {
            options = {
                exitKey: "x",
                optionSeparator: ")",
                cursorPrefix: "─►",
                retryOnInvalid: true,
                onFinished: () => {},
                autoSubmit: false
            };
        }
        else
        {
            if(isEmpty(options.exitKey)) options.exitKey = "";
            if(isEmpty(options.optionSeparator)) options.optionSeparator = ")";
            if(options.cursorPrefix !== "" && isEmpty(options.cursorPrefix)) options.cursorPrefix = "─►";
            if(isEmpty(options.retryOnInvalid)) options.retryOnInvalid = true;
            if(isEmpty(options.onFinished)) options.onFinished = () => {};
            if(isEmpty(options.autoSubmit)) options.autoSubmit = false;
        }
        this._options = options;

        this._results = [];

        this._currentMenu = -1;

        if(!process.stdin.isRaw && typeof process.stdin.setRawMode === "function") // need the extra check for GitHub CI which fails since it doesn't provide a stdin
            process.stdin.setRawMode(true);

        
        this.localization = {
            wrongOption: "Please type one of the green options and press <Return>",
            invalidOptionSelected: "Invalid option selected:",
            exitOptionText: "Exit"
        };


        return true;
    }

    //#MARKER open
    /**
     * 🔹 Opens the menu 🔹
     * ⚠️ Warning: While the menu is opened you shouldn't write anything to the console / to the stdout and stderr as this could mess up the layout of the menu and/or make stuff unreadable
     * @returns {(Boolean|String)} Returns true, if the menu could be opened or a string containing an error message, if not
     * @since 1.8.0
     */
    open()
    {
        let isEmpty = require("../functions/isEmpty");
        let col = require("../objects/colors");

        if(this._active)
            return "This MenuPrompt object was already opened - not opening again";

        if(isEmpty(this._menus))
            return `No menus were added to the MenuPrompt object. Please use the method "MenuPrompt.addMenu()" or supply the menu(s) in the construction of the MenuPrompt object before calling "MenuPrompt.open()"`;

        this._active = true;


        let openMenu = (idx, userFeedback) => {
            if(idx >= this._menus.length || !this._active)
            {
                this.close();
                this._options.onFinished(this._results);
                return;
            }
            else
            {
                this._currentMenu = idx;

                this._clearConsole();

                let currentMenu = {
                    title: "",
                    options: ""
                }

                currentMenu.title = this._menus[idx].title;

                let titleUL = "";
                currentMenu.title.split("").forEach(() => titleUL += "‾");

                let longestOption = 0;
                this._menus[idx].options.forEach(option => longestOption = option.key.length > longestOption ? option.key.length : longestOption);

                this._menus[idx].options.forEach(option => {
                    let optionSpacer = "  ";
                    let neededSpaces = longestOption - option.key.length;
                    for(let i = 0; i < neededSpaces; i++)
                        optionSpacer += " ";
                    
                    currentMenu.options += `${col.fg.green}${option.key}${col.rst}${this._options.optionSeparator}${optionSpacer}${option.description}\n`;
                });

                if(!isEmpty(this._options.exitKey))
                {
                    let exitSpacer = "  ";
                    let neededExitSpaces = longestOption - this._options.exitKey.length;
                    for(let i = 0; i < neededExitSpaces; i++)
                        exitSpacer += " ";
                
                    currentMenu.options += `\n${col.fg.red}${this._options.exitKey}${col.rst}${this._options.optionSeparator}${exitSpacer}${this.localization.exitOptionText}\n`;
                }

                let menuText = `\
${isEmpty(userFeedback) ? "\n\n\n" : `${col.fg.red}❗️ > ${userFeedback}${col.rst}\n\n\n`}${col.fat}${col.fg.cyan}${currentMenu.title}${col.rst}
${col.fg.cyan}${titleUL}${col.rst}
${currentMenu.options}

${this._options.cursorPrefix} \
`;

                let answerCallback = answer => {
                    if(!isEmpty(this._options.exitKey) && answer == this._options.exitKey)
                        return openMenu(++idx);

                    console.log();

                    if(isEmpty(answer) && this._options.retryOnInvalid !== false)
                        return openMenu(idx, this.localization.wrongOption);
                    else
                    {
                        let currentOptions = this._menus[idx].options;
                        let selectedOption = null;
                        currentOptions.forEach((opt, i) => {
                            if(opt.key == answer)
                            {
                                selectedOption = opt;
                                selectedOption["menuTitle"] = this._menus[idx].title;
                                selectedOption["optionIndex"] = i;
                                selectedOption["menuIndex"] = idx;
                            }
                        });

                        if(selectedOption != null)
                        {
                            if(typeof this._results != "object" || isNaN(parseInt(this._results.length)))
                                this._results = [selectedOption];
                            else this._results.push(selectedOption);

                            return openMenu(++idx);
                        }
                        else
                        {
                            return openMenu(idx, `${this.localization.invalidOptionSelected} "${answer.replace(/\n|\r\n/gm, "\\\\n")}"`.toString());
                        }
                    }
                }

                if(!this._options.autoSubmit)
                {
                    this._rl.resume();
                    this._rl.question(menuText, answer => {
                        this._rl.pause();
                        return answerCallback(answer);
                    });
                }
                else
                {
                    this._listenerAttached = true;
                    process.stdout.write(menuText);
                    process.stdin.resume();

                    let keypressEvent = chunk => {
                        if(this._listenerAttached)
                        {
                            process.stdin.pause();
                            removeKeypressEvent();
                            return answerCallback(chunk);
                        }
                    };

                    let removeKeypressEvent = () => {
                        process.stdin.removeListener("keypress", keypressEvent);
                        this._listenerAttached = false;
                    };

                    process.stdin.on("keypress", keypressEvent);
                }
            }
        }

        openMenu(0);
        return true;
    }

    //#MARKER close
    /**
     * 🔹 Closes the menu and returns the selected options up to this point 🔹
     * @returns {Array<MenuPromptResult>} Returns the results of the menu prompt
     * @since 1.8.0
     */
    close()
    {
        this._active = false;
        this._closed = true;
        this._currentMenu = -1;
        this._rl.close();
        this._clearConsole();

        return this._results;
    }

    //#MARKER addMenu
    /**
     * 🔹 Adds a new menu to the menu prompt.
     * You can even add new menus while the MenuPrompt is already open. 🔹
     * @param {MenuPropmtMenu} menu
     * @returns {(Boolean|String)} Returns true, if the menu could be added or a string containing an error message, if not
     * @since 1.8.0
     */
    addMenu(menu)
    {
        if(this._closed)
            return `MenuPrompt was already closed, can't add a new menu with "svc.MenuPrompt.addMenu()"`;

        if(!this.validateMenu(menu))
            return `Invalid menu provided in "svc.MenuPrompt.addMenu()"`;

        try
        {
            if(this._menus == undefined)
                this._menus = [];
            this._menus.push(menu);
        }
        catch(err)
        {
            return err;
        }
        return true;
    }

    //#MARKER currentMenu
    /**
     * 🔹 Returns the (zero-based) index of the current menu 🔹
     * @returns {Number} The zero-based index of the current menu or `-1` if the menu hasn't been opened yet
     * @since 1.8.0
     */
    currentMenu()
    {
        return this._currentMenu;
    }

    //#MARKER result
    /**
     * 🔹 Returns the current results of the menu prompt 🔹
     * Does NOT close the menu prompt.
     * @returns {MenuPromptResult} Returns the results of the menu prompt or null, if there aren't any results yet
     * @since 1.8.0
     */
    result()
    {
        let isEmpty = require("../functions/isEmpty");

        if(!isEmpty(this._result))
            return this._result;
        else return null;
    }

    //#MARKER validateMenu
    /**
     * 🔹 Checks a menu for valid syntax 🔹
     * @param {MenuPropmtMenu} menu The menu that should be validated
     * @returns {(Boolean|Array<String>)} Returns true if the menu is valid, a string array containing the error messages if not
     * @throws Throws an error if a falsy parameter or no parameter at all was passed
     */
    validateMenu(menu)
    {
        let isEmpty = require("../functions/isEmpty");
        let isArrayEmpty = require("../functions/isArrayEmpty");

        let errors = [];

        if(isEmpty(menu))
            throw new Error(`The passed parameter "menu" is not present or empty`);

        if(typeof menu != "object")
            errors.push(`Wrong variable type for parameter "menu". Expected: "object", got "${typeof menu}"`);

        if(Array.isArray(menu))
            errors.push(`"menu" parameter can't be an array`);
        
        if(isEmpty(menu.title) || typeof menu.title != "string")
            errors.push(`"title" property is either not present, empty or not of type "string"`);

        if(isEmpty(menu.options))
            errors.push(`"options" property is not present or of the wrong type. Expected: "object", got: "${typeof menu.options}"`);

        if(!isEmpty(menu.options) && (!Array.isArray(menu.options) || menu.options.length <= 0))
            errors.push(`"options" property has to be an array and has to contain at least one item`);

        if(!isEmpty(menu.options))
            menu.options.forEach((opt, i) => {
                if(Array.isArray(opt))
                    errors.push(`The option with the array index ${i} can't be an array`);

                if(typeof opt.key != "string")
                    errors.push(`Wrong variable type for option.key (at array index ${i}). Expected: "string", got "${typeof opt.key}"`);

                if(typeof opt.description != "string")
                    errors.push(`Wrong variable type for option.description (at array index ${i}). Expected: "string", got "${typeof opt.description}"`);
            });
        
        if(this._options.autoSubmit)
        {
            menu.options.forEach((opt, i) => {
                if(opt.key && opt.key.length > 1)
                    errors.push(`The option "autoSubmit" was set to true but the key of the option with the array index ${i} is more than a single character in length`);
            });
        }


        if(isArrayEmpty(errors))
            return true;
        else return errors;
    }

    //#MARKER _clearConsole
    /**
     * ❌ Private method - don't use ❌
     * @private
     */
    _clearConsole()
    {
        try
        {
            if(console && console.clear && process.stdout && process.stdout.isTTY)
                console.clear();
            else if(console)
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            else
                process.stdout.write("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }
        catch(err) // this might be overkill but eh ¯\_(ツ)_/¯
        {
            return;
        }
    }
}
module.exports = MenuPrompt;
