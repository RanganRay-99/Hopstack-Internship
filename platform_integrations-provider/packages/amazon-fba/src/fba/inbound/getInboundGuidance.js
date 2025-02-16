const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getInboundGuidance = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, sellerSKU, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getInboundGuidance',
      endpoint: 'fulfillmentInbound',
      query: {
        MarketplaceId: MarketPlaces[marketplaceCountryCode],
        SellerSKUList: sellerSKU,
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

module.exports = getInboundGuidance
