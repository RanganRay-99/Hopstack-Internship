const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Updates the quantity of a product by ID using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for updating the product quantity.
 * @param {string} params.accessToken - The access token for authentication.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} params.productId - The ID of the product.
 * @param {number} params.productNewQuantity - The new quantity of the product.
 * @returns {Promise<Object>} A Promise that resolves to an object with the following properties:
 *   - status {number} - The HTTP status code of the response (e.g., 201).
 *   - success {boolean} - Indicates whether the update was successful.
 *   - data {Object} - Additional data related to the update:
 *     - message {string} - A message indicating the success of the update.
 *     - code {number} - A code representing the success of the update.
 * @throws {Error} If an error occurs while updating the product quantity.
 */
const updateProductQuantityById = async (params) => {
  try {
    const { accessToken, baseUrl, productId, productNewQuantity } = params
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const data = {
      quantity: productNewQuantity,
    }

    const axiosConfig = {
      method: 'PUT',
      url: `${SALLA_BASEURL}/products/quantities/${productId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
      data,
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateProductQuantityById
