const { getSellingPartnerAPI } = require('@/utils')

const getOrderItems = async (params) => {
  try {
    const { token, clientID, clientSecret, orderId, nextToken, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getOrderItems',
      endpoint: 'orders',
      path: {
        orderId,
      },
      query: {
        NextToken: nextToken,
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

module.exports = getOrderItems
