const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Retrieves the status of an order by ID using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for retrieving the order status.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} params.accessToken - The access token for authentication.
 * @param {string} params.orderStatusId - The ID of the order status.
 * @returns {Promise<Object>} A Promise that resolves to the order status data.
 * @throws {Error} If an error occurs while retrieving the order status.
 */
const getOrderStatusById = async ({ baseUrl, accessToken, orderStatusId }) => {
  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const axiosConfig = {
      method: 'GET',
      url: `${SALLA_BASEURL}/orders/statuses/${orderStatusId}`,
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

module.exports = getOrderStatusById
