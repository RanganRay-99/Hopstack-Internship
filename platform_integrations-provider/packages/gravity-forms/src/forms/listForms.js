const requestHandler = require('../gravityFormsRequestHandler')

/**
 * Gets the details of all forms
 * @param {Object} params
 * @param {String} params.baseUrl (optinal) The base URL
 * @param {String} params.customerKey (optional) The customer key
 * @param {String} params.customerSecret (optional) The customer secret
 * @returns {Promise<object>} Form Object
 * @see https://docs.gravityforms.com/rest-api-v2/#h-get-forms
 */

const listForms = async ({ baseUrl, customerKey, customerSecret }) => {
  try {
    return requestHandler('get', '/wp-json/gf/v2/forms', baseUrl, customerKey, customerSecret)
  } catch (error) {
    console.error(`Error while getting all forms. Error Message: ${error.message}`, error)
    throw new Error(error.message)
  }
}

module.exports = listForms
