const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Retrieves the details of a product by ID using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for retrieving the product details.
 * @param {string} params.accessToken - The access token for authentication.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} params.productId - The ID of the product.
 * @returns {Promise<Object>} A Promise that resolves to the product details.
 * @throws {Error} If an error occurs while retrieving the product details.
 */
const getProductDetailsById = async ({ accessToken, baseUrl, productId }) => {
  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const axiosConfig = {
      method: 'GET',
      url: `${SALLA_BASEURL}/products/${productId}`,
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

module.exports = getProductDetailsById
