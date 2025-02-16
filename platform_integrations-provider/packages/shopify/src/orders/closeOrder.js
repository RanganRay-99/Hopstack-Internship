const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const closeOrder = async (params) => {
  try {
    const { apiUrl, orderId } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'post',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/close.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = closeOrder
