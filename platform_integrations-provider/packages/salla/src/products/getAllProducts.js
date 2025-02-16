const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Retrieves all products using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for retrieving all products.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} params.accessToken - The access token for authentication.
 * @param {number} [params.page] -  Page no.
 * @param {number} [params.perPage] - Product in reponse per page.
 * @returns {Promise<Object>} A Promise that resolves to an array of products.
 * @throws {Error} If an error occurs while retrieving the products.
 */
const getAllProducts = async ({ baseUrl, accessToken, page, perPage }) => {
  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const axiosConfig = {
      method: 'GET',
      url: `${SALLA_BASEURL}/products`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
      params: {
        page,
        per_page: perPage,
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAllProducts
