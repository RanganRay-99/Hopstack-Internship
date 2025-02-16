const { getSellingPartnerAPI } = require('@/utils')

const voidTransport = async (params) => {
  try {
    const { token, clientID, clientSecret, shipmentId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'voidTransport',
      endpoint: 'fulfillmentInbound',
      path: {
        shipmentId: shipmentId,
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

module.exports = voidTransport
