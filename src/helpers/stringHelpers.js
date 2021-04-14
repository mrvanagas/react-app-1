/**
 * Searches backwards for symbol in a string until one of symbols, given in 'until' array, is found.
 * 
 * @param {String} string - string value in which we will search backwards
 * @param {String} search - symbol which we are searching
 * @param {Array} until - array of symbols that stops the search
 * 
 * @returns {Boolean} true if 'search' symbol was found, false otherwise.
 */
export const existsInStringUntilBackwards = (string, search, until) => {
  for (let i = string.length - 1; i >= 0; i--) {
    if (until.includes(string[i]))
      break;
    if (string[i] === search)
      return true;
  }
  return false;
}
