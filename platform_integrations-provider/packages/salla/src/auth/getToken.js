const axios = require('axios').default
const URL = require('url')
const { salla } = require('../config/config')

let SALLA_CLIENT_ID = salla.clientId
let SALLA_CLIENT_SECRET = salla.clientSecret
/**
 * Retrieves an access token using the refresh token grant flow with the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for retrieving the access token.
 * @param {string} [params.clientId] - The client ID for authentication (optional, defaults to the configured value).
 * @param {string} [params.clientSecret] - The client secret for authentication (optional, defaults to the configured value).
 * @param {string} params.refreshToken - The refresh token.
 * @param {string} params.redirectUri - The redirect URI used during the authorization process.
 * @returns {Promise<Object>} A Promise that resolves to the access token data.
 * @throws {Error} If an error occurs while retrieving the access token.
 */
const getToken = async ({ clientId, clientSecret, refreshToken, redirectUri }) => {
  try {
    SALLA_CLIENT_ID = clientId || SALLA_CLIENT_ID
    SALLA_CLIENT_SECRET = clientSecret || SALLA_CLIENT_SECRET

    const data = new URL.URLSearchParams({
      client_id: SALLA_CLIENT_ID,
      client_secret: SALLA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: redirectUri,
    })

    const axiosConfig = {
      method: 'POST',
      url: 'https://accounts.salla.sa/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getToken
