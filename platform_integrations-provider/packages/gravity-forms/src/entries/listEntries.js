const requestHandler = require('../gravityFormsRequestHandler')

/**
 * Gets all entries
 * @param {Object} params
 * @param {String} params.baseUrl
 * @param {String} params.customerKey
 * @param {String} params.customerSecret
 * @returns {Promise<Object>} Promise object represents the list of entries
 * @see https://docs.gravityforms.com/rest-api-v2/#h-get-entries
 */

const listEntries = async ({ baseUrl, customerKey, customerSecret }) => {
  try {
    return requestHandler('get', '/wp-json/gf/v2/entries', baseUrl, customerKey, customerSecret)
  } catch (error) {
    console.error(`Error while getting all entries. Error Message: ${error.message}`, error)
    throw error
  }
}

module.exports = listEntries
