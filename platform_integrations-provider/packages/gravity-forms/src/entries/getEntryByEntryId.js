const requestHandler = require('../gravityFormsRequestHandler')

/**
 * Gets an entry based on the entry ID
 * @param {object} params
 * @param {number} params.entryId The ID of the entry to retrieve
 * @param {string} params.baseUrl (Optional) The base URL
 * @param {string} params.customerKey (Optional) The customer key
 * @param {string} params.customerSecret (Optional) The customer secret
 * @returns {Promise<object>} entry
 * @see https://docs.gravityforms.com/rest-api-v2/#h-get-entries-entry-id
 */

const getEntryByEntryId = async ({ entryId, baseUrl, customerKey, customerSecret }) => {
  if (!entryId) {
    console.error('entryId is required')
    throw new Error('entryId is required')
  }
  try {
    return requestHandler('get', `/wp-json/gf/v2/entries/${entryId}`, baseUrl, customerKey, customerSecret)
  } catch (error) {
    console.error(`Error while getting entry with id: ${entryId}. Error Message: ${error.message}`, error)
    throw error
  }
}

module.exports = getEntryByEntryId
