const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getShipmentItemsByShipmentId = async (params) => {
  try {
    const { token, clientID, clientSecret, shipmentId, marketplaceCountryCode, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getShipmentItemsByShipmentId',
      endpoint: 'fulfillmentInbound',
      path: {
        shipmentId: shipmentId,
      },
      query: {
        MarketplaceId: MarketPlaces[marketplaceCountryCode],
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

module.exports = getShipmentItemsByShipmentId
