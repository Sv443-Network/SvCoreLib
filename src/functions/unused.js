/**
 * 🔹 Use this if you are using a linter that complains about unused vars.
 * As this function basically does nothing, you can even leave it in once the variable is used again and nothing will break. 🔹
 * @param {*} [any] Any variable(s) of any type
 * @returns {void}
 * @since 1.8.0
 * @version 1.9.0 Function now accepts an infinite number of parameters
 */
const unused = (...any) => {
    void(any);
    return;
};
module.exports = unused;
