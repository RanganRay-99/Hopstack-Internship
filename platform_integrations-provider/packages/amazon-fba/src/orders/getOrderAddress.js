const { getSellingPartnerAPI } = require('@/utils')

const getOrderAddress = async (params) => {
  try {
    const { token, clientID, clientSecret, orderId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getOrderAddress',
      endpoint: 'orders',
      path: {
        orderId,
      },
      options: {
        version: 'v0',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = getOrderAddress
