const axios = require('axios').default
const config = require('../config/config')
const { salla } = config

let SALLA_BASEURL = salla.baseUrl
/**
 * Retrieves all orders using the Salla API.
 *
 * @async
 * @param {Object} params - The parameters for retrieving all orders.
 * @param {string} [params.baseUrl] - The base URL for the Salla API (optional, defaults to the configured value).
 * @param {string} [params.fromDate] - The start date to filter orders (optional).
 * @param {string} [params.toDate] - The end date to filter orders (optional).
 * @param {string} [params.orderStatus] - The order status to filter orders (optional).
 * @param {string} params.accessToken - The access token for authentication.
 * @param {number} [params.page] -  Page no.
 * @param {number} [params.perPage] - Orders in reponse per page.
 * @returns {Promise<Object>} A Promise that resolves to an array of orders.
 * @throws {Error} If an error occurs while retrieving the orders.
 */
const getAllOrders = async ({ baseUrl, fromDate, toDate, orderStatus, accessToken, page, perPage }) => {

  try {
    SALLA_BASEURL = baseUrl || salla.baseUrl

    const axiosConfig = {
      method: 'GET',
      url: `${SALLA_BASEURL}/orders`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
      params: {
        from_date: fromDate,
        to_date: toDate,
        status: orderStatus,
        page,
        per_page: perPage
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAllOrders
