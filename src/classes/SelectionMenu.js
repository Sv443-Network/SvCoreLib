const allOfType = require("../functions/allOfType");
const unused = require("../functions/unused");

const inputCooldown = 50;


class SelectionMenu
{
    constructor(title, settings)
    {
        require("keypress")(process.stdin);

        if(settings == undefined || typeof settings != "object")
        {
            settings = {
                overflow: true,   // if the user scrolls past the end or beginning, should the SelectionMenu overflow to the other side?
                cancelable: true, // whether or not the user can cancel the prompt with the Esc key
            };
        }
        else
        {
            settings = {
                overflow: (typeof settings.overflow == "boolean" ? settings.overflow : true),
                cancelable: (typeof settings.cancelable == "boolean" ? settings.cancelable : true)
            }
        }

        this.promiseRes = () => {};
        this.promiseRej = () => {};
        this.callbackFn = () => {};

        this.title = (typeof title == "string" || typeof title == "number") ? title.toString() : null;
        this.settings = settings;
        this.options = [];
        this.optIndex = 0;
    }

    setOptions(options)
    {
        if(!Array.isArray(options) || (Array.isArray(options) && !allOfType(options, "string")))
            return `Parameter "options" is not an array of strings`;
        
        this.options = options;
        return true;
    }

    addOption(option)
    {
        if(typeof option != "string")
            return "Parameter \"option\" is not of type string";

        this.options.push(option);

        return true;
    }

    onSubmit(callback_fn)
    {
        return new Promise((pRes, pRej) => {
            this.promiseRes = pRes;
            this.promiseRej = pRej;
            
            if(typeof callback_fn == "function")
                this.callbackFn = callback_fn;
        });
    }

    open()
    {
        if(!this.options.length == 0)
            return "No options were set in the FolderPrompt. Use the methods \"setOptions()\" or \"addOption()\" to add some before opening the FolderPrompt.";
        
        this.addListeners();
    }

    /**
     * @private
     */
    update()
    {
        this.clearConsole();

        let logTxt = [
            `${this.title}\n`,
            ...this.options
        ];

        process.stdout.write(logTxt.join("\n"));
    }

    /**
     *@private 
     */
    addListeners()
    {
        process.stdin.setRawMode(true);

        process.stdin.on("keypress", (char, key) => {
            unused(char);
            
            if(this.onCooldown || !key)
                return;
    
                this.onCooldown = true;
            setTimeout(() => {
                this.onCooldown = false;
            }, inputCooldown);
    
            switch(key.name)
            {
                case "space":
                case "return":
                    // submit currently selected option
                    this.removeListeners();
                break;
                case "s":
                case "down":
                    // optionIndex++;
                break;
                case "a":
                case "up":
                    // optionIndex--;
                    if(this.optIndex == 0 && this.settings.overflow)
                        this.optIndex = (this.options.length - 1);
                    else
                        this.optIndex--;
                break;
                case "escape":
                    if(this.settings.cancelable)
                    {
                        // cancel
                        this.removeListeners();
                    }
                break;
            }
        });
        process.stdin.resume();
    }

    /**
     * @private
     */
    removeListeners()
    {
        process.stdin.removeAllListeners(["keypress"]);
        return true;
    }

    close()
    {
        let rmRes = this.removeListeners();
        let upRes = this.update();

        return (rmRes && upRes);
    }

    /**
     * @private
     */
    clearConsole()
    {
        process.stdout.clearLine();
        process.stdout.cursorTo(0, 0);
        process.stdout.write("\n");

        try
        {
            if(console && console.clear && process.stdout && process.stdout.isTTY)
                console.clear();
            else if(console)
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            else process.stdout.write("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }
        catch(err)
        {
            return;
        }
    }
}

module.exports = SelectionMenu;
