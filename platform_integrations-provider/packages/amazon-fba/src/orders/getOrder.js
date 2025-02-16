const { getSellingPartnerAPI } = require('@/utils')

const getOrder = async (params) => {
  try {
    const { token, clientID, clientSecret, orderId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getOrder',
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

module.exports = getOrder
