const axios = require('axios').default
const config = require('./config/config')
const auth = require('./config/auth')
const toCamelCase = require('./utils/toCamelCase')
const modifyResponse = require('./utils/modifyResponse')

const gravityForms = config.gravityForms

/**
 * @file gravityFormsRequestHandler.js
 * @module gravityFormsRequestHandler
 * @description Contains the request handler for the Gravity Forms API
 * @requires module:axios
 * @requires module:config
 * @requires module:auth
 * @requires module:toCamelCase
 * @requires module:modifyResponse
 * @returns {Promise<Function>} requestHandler
 */

const requestHandler = async (method, url, baseUrl, customerKey, customerSecret) => {
  try {
    let headers = {
      Authorization: auth(customerKey, customerSecret),
    }
    const axiosConfig = {
      method: method,
      url: `${baseUrl || gravityForms.baseUrl}${url}`,
      headers: headers,
    }
    const response = await axios(axiosConfig)
    const camelCaseResponse = toCamelCase(response.data)
    const updatedResponse = modifyResponse(camelCaseResponse)
    return updatedResponse
  } catch (err) {
    console.error(`Error while invoking gravity forms url:${url} message: ${err.message}`, err)
    throw err
  }
}

module.exports = requestHandler
