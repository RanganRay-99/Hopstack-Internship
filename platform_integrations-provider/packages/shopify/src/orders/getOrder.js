const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getOrder = async (params) => {
  try {
    const { apiUrl, orderId } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'get',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}.json`,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getOrder
