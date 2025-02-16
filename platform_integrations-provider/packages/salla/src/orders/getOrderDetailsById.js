const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Retrieves the details of an order by ID using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for retrieving the order details.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} params.orderId - The ID of the order.
 * @param {string} params.accessToken - The access token for authentication.
 * @returns {Promise<Object>} A Promise that resolves to the order details.
 * @throws {Error} If an error occurs while retrieving the order details.
 */
const getOrderDetailsById = async ({ baseUrl, orderId, accessToken }) => {
  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const axiosConfig = {
      method: 'GET',
      url: `${SALLA_BASEURL}/orders/${orderId}`,
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

module.exports = getOrderDetailsById
