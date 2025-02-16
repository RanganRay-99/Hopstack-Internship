const { getSellingPartnerAPI } = require('@/utils')

const getOrderRegulatedInfo = async (params) => {
  try {
    const { token, clientID, clientSecret, orderId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getOrderRegulatedInfo',
      endpoint: 'orders',
      path: {
        orderId: orderId,
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

module.exports = getOrderRegulatedInfo
