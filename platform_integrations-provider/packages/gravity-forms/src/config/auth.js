const config = require('./config')
const gravityForms = config.gravityForms

/**
 * Gravity Forms API authentication
 * @module auth
 * @description Contains the authentication for the Gravity Forms API
 * @requires module:config
 * @returns {string} auth
 * @see https://docs.gravityforms.com/rest-api-v2-authentication/#basic-authentication
 */

const auth = (customerKey, customerSecret) => {
  return (
    'Basic ' +
    Buffer.from((customerKey || gravityForms.consumerKey) + ':' + (customerSecret || gravityForms.consumerSecret)).toString(
      'base64',
    )
  )
}

module.exports = auth
