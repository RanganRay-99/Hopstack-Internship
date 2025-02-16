const getToken = require('@/auth/getToken')
const axios = require('axios').default

const getShippingFulfillments = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, orderId } = params
    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/fulfillment/v1/order/${orderId}/shipping_fulfillment`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getShippingFulfillments
