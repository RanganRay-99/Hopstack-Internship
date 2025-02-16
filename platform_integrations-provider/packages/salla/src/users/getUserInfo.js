const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl

/**
 * Retrieves user information from the Salla API using the provided access token.
 * If a custom base URL is provided, it will be used; otherwise, the default base URL from the config will be used.
 * @async
 * @param {Object} options - The options object containing the parameters for the API call.
 * @param {string} [options.baseUrl] - Optional custom base URL for the Salla API.
 * @param {string} options.accessToken - The access token for authentication.
 * @return {Promise<Object>} A promise that resolves to the user information object from the API response.
 * @throws {Error} An error object if there's an issue with the API call or response.
 */
const getUserInfo = async ({ baseUrl, accessToken }) => {
  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const axiosConfig = {
      method: 'GET',
      url: `${SALLA_BASEURL}/oauth2/user/info`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getUserInfo