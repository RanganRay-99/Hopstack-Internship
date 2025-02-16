const requestHandler = require('../gravityFormsRequestHandler')

/**
 * Gets the details of a form based on the specified form ID
 * @param {Object} params
 * @param {Number} params.formId The ID of the form to retrieve
 * @param {String} params.baseUrl (optinal) The base URL
 * @param {String} params.customerKey (optional) The customer key
 * @param {String} params.customerSecret (optional) The customer secret
 * @returns {Promise<object>} Form Object
 * @see https://docs.gravityforms.com/rest-api-v2/#h-get-forms-form-id
 */

const getFormByFormId = async ({ formId, baseUrl, customerKey, customerSecret }) => {
  if (!formId) {
    console.error('formId is required')
    throw new Error('formId is required')
  }
  try {
    return requestHandler('get', `/wp-json/gf/v2/forms/${formId}`, baseUrl, customerKey, customerSecret)
  } catch (error) {
    console.error(`Error while getting form with id: ${formId}. Error Message: ${error.message}`, error)
    throw new Error(error.message)
  }
}

module.exports = getFormByFormId
