/**
 * An object of settings to be used in the constructor of the `SelectionMenu` class
 */
export interface SelectionMenuSettings
{
    [key: string]: boolean | undefined;

    /** Whether or not the user can cancel the prompt with the Esc key */
    cancelable?: boolean;
    /** If the user scrolls past the end or beginning, should the SelectionMenu overflow to the other side? */
    overflow?: boolean;
}

export interface SelectionMenuResult {
    /** If this is `true`, the user has canceled the SelectionMenu by pressing the Escape key */
    canceled: boolean;

    /** An object containing the index and text of the selected option */
    option: {
        /** The zero-based index of the option the user has selected */
        index: number;
        /** The description / text of the option the user has selected */
        description: string;
    }
}

export interface SelectionMenuLocale
{
    [key: string]: string | undefined;

    /** Shorthand name of the escape key - defaults to "Esc" */
    escKey?: string;
    /** Cancel text - defaults to "Cancel" */
    cancel?: string;
    /** Scroll text - defaults to "Scroll" */
    scroll?: string;
    /** Shorthand name of the return key - defaults to "Return" */
    returnKey?: string;
    /** Select text - defaults to "Select" */
    select?: string;
}

/**
 * An option of the SelectionMenu.  
 * Can be a string or null if you want a spacer line.
 */
export type SelectionMenuOption = string | null;
