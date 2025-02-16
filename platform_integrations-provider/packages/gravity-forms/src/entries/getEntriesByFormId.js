const requestHandler = require('../gravityFormsRequestHandler')

/**
 * Gets entries associated with a specific form
 * @param {Object} params
 * @param {Number} params.formId The ID of the form to retrieve
 * @param {String} params.baseUrl (optinal) The base URL
 * @param {String} params.customerKey (optional) The customer key
 * @param {String} params.customerSecret (optional) The customer secret
 * @returns {Promise<object>} Entries Object
 * @see https://docs.gravityforms.com/rest-api-v2/#h-get-forms-form-id-entries
 */

const getEntriesByFormId = async ({ formId, baseUrl, customerKey, customerSecret }) => {
  if (!formId) {
    console.error('formId is required')
    throw new Error('formId is required')
  }
  try {
    return await requestHandler('get', `/wp-json/gf/v2/forms/${formId}/entries`, baseUrl, customerKey, customerSecret)
  } catch (error) {
    console.error(`Error while getting entries for form with id: ${formId}. Error Message: ${error.message}`, error)
    throw error
  }
}

module.exports = getEntriesByFormId
