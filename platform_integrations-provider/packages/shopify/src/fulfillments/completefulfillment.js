const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const completefulfillment = async (params) => {
  try {
    const { apiUrl, orderId, fulfillmentId } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {}
    const axiosConfig = {
      method: 'POST',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/fulfillments/${fulfillmentId}/complete.json`,
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

module.exports = completefulfillment
