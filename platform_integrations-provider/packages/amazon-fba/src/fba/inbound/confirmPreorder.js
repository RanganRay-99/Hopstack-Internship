const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const confirmPreorder = async (params) => {
  const { token, clientID, clientSecret, shipmentId, needByDate, marketplaceCountryCode, region } = params

  try {
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'confirmPreorder',
      endpoint: 'fulfillmentInbound',
      path: {
        shipmentId: shipmentId,
      },
      query: {
        NeedByDate: needByDate, // YYYY-MM-DD
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

module.exports = confirmPreorder
