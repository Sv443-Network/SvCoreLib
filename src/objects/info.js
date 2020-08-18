const packageJSON = require("../../package.json");

/**
 * 🔹 Info about SvCoreLib 🔹
 * @param {Object} svcinfo
 * @param {String} svcinfo.version The current version
 * @param {Array<Number>} svcinfo.intVersion The current version of SvCoreLib, but as an array of numbers for easier manipulation
 * @param {String} svcinfo.name The name of SvCoreLib
 * @param {String} svcinfo.desc A short description of SvCoreLib
 * @param {String} svcinfo.author The author of SvCoreLib - format: "name <email> (website)"
 * @param {Array<String>} svcinfo.contributors People that contributed to SvCoreLib - format: "name <email> (website)"
 * @param {String} svcinfo.license The license of SvCoreLib
 * @param {String} svcinfo.documentation The URL to SvCoreLib's documentation
 * @since 1.5.0
 * @version 1.8.0 added "contributors" array
 */
const jslInfo = {
    version: packageJSON.version,
    intVersion: packageJSON.version.split(".").map(v => v = parseInt(v)),
    name: "SvCoreLib",
    desc: packageJSON.description,
    author: packageJSON.author.name,
    authorLong: `${packageJSON.author.name} <${packageJSON.author.email}> (${packageJSON.author.url})`,
    contributors: packageJSON.contributors != undefined ? packageJSON.contributors : [],
    license: `${packageJSON.license} (https://sv443.net/LICENSE)`,
    documentation: "https://github.com/Sv443/SvCoreLib/wiki"
};
module.exports = jslInfo;
