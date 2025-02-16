const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const updateFulfillment = async (params) => {
  try {
    const { apiUrl, orderId, fulfillmentId, trackingNumber } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = { fulfillment: { tracking_number: trackingNumber, id: fulfillmentId } }
    const axiosConfig = {
      method: 'PUT',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/fulfillments/${fulfillmentId}.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateFulfillment
