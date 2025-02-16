const { getSellingPartnerAPI } = require('@/utils')

const getTransportDetails = async (params) => {
  try {
    const { token, clientID, clientSecret, shipmentId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getTransportDetails',
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

module.exports = getTransportDetails
