const { getSellingPartnerAPI } = require('@/utils')

const getShipment = async (params) => {
  try {
    const { token, clientID, clientSecret, shipmentId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getShipment',
      endpoint: 'merchantFulfillment',
      path: {
        shipmentId,
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

module.exports = getShipment
