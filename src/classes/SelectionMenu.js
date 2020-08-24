const allOfType = require("../functions/allOfType");

class SelectionMenu
{
    constructor(title, settings)
    {
        if(settings == undefined)
        {
            settings = {
                overflow: true, // if the user scrolls past the end or beginning, should the SelectionMenu overflow to the other side?
                paging: true,   // if the options exceed the height of the terminal, should SelectionMenu add multiple pages of options?
            };
        }
        else
        {
            settings = {
                overflow: settings.overflow || true,
                paging: settings.paging || true,
            }
        }

        this.title = (typeof title == "string" || typeof title == "number") ? title.toString() : null;
        this.settings = settings;
        this.options = [];
    }

    setOptions(options)
    {
        if(!Array.isArray(options) || (Array.isArray(options) && !allOfType(options, "string")))
            return `Parameter "options" is not an array of strings`;
        
        this.options = options;
        return true;
    }

    open()
    {

    }

    close()
    {

    }
}

module.exports = SelectionMenu;
