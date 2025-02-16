const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Updates the status of an order by ID using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for updating the order status.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} params.orderId - The ID of the order .
 * @param {string} params.statusSlug - The slug of the status to update the order to.
 * @param {string} params.accessToken - The access token for authentication.
 * @param {string} params.statusId - status id of updated order
 * @returns {Promise<Object>} A Promise that resolves to the updated order data.
 * @throws {Error} If an error occurs while updating the order status.
 */
const updateOrderStatusById = async ({ baseUrl, orderId, statusSlug, accessToken, statusId }) => {
  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const data = {
      slug: statusSlug,
      status_id: statusId,
    }

    const axiosConfig = {
      method: 'POST',
      url: `${SALLA_BASEURL}/orders/${orderId}/status`,
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

module.exports = updateOrderStatusById
