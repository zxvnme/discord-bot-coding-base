/**
 * Wraps message with one backtick.
 * @constructor
 * @param {string} message - message to be wrapped.
 */
module.exports.wrapWithOBT = (message) => {
  return "`" + message + "`";
}
/**
* Wraps message with three backticks.
* @constructor
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithTBT = (message) => {
  return "```" + message + "```";
}
/**
* Wraps message with code syntax highlighting.
* @constructor
* @param {string} language - language that would be highlighted.
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithCSH = (language, message) => {
  return "```" + language + "\n" + message + "```";
}

/**
* Wraps message with italic text style.
* @constructor
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithItalic = (message) => {
  return "*" + message + "*";
}

/**
* Wraps message with bold text style.
* @constructor
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithBold = (message) => {
  return "**" + message + "**";
}

/**
* Wraps message with italic and bold text style at once.
* @constructor
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithItalicBold = (message) => {
  return "***" + message + "***";
}

/**
* Strikes message.
* @constructor
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithStrike = (message) => {
  return "~~" + message + "~~";
}

/**
* Underlines message.
* @constructor
* @param {string} message - message to be wrapped.
*/
module.exports.wrapWithUnderline = (message) => {
  return "__" + message + "__";
}