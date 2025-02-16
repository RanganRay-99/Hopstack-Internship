const { getSellingPartnerAPI } = require('@/utils')

const estimateTransport = async (params) => {
  try {
    const { token, clientID, clientSecret, shipmentId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'estimateTransport',
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

module.exports = estimateTransport
