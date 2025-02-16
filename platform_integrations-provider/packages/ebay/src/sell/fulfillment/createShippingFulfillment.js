const getToken = require('@/auth/getToken')
const axios = require('axios').default

const createShippingFulfillment = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, orderId, lineItems, shippedDate, shippingCarrierCode, trackingNumber } =
      params
    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })
    const data = {
      lineItems: lineItems.map((item) => ({ lineItemId: item.lineItemId, quantity: item.quantity })),
      shippedDate,
      shippingCarrierCode,
      trackingNumber,
    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/fulfillment/v1/order/${orderId}/shipping_fulfillment`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      data,
    }
    const response = await axios(axiosConfig)
    const fulfillmentId = response.headers.location.substring(1 + response.headers.location.lastIndexOf('/'))
    return { fulfillmentId }
  } catch (err) {
    return err
  }
}

module.exports = createShippingFulfillment
