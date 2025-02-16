const getToken = require('@/auth/getToken')
const axios = require('axios').default

const getOrder = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, orderId, fieldGroups } = params
    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/fulfillment/v1/order/${orderId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        orderId,
        fieldGroups,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getOrder
