const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getInventorySummaries = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, nextToken, startDateTime, sellerSkus, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getInventorySummaries',
      endpoint: 'fbaInventory',
      query: {
        granularityType: 'Marketplace',
        granularityId: MarketPlaces[marketplaceCountryCode],
        marketplaceIds: [MarketPlaces[marketplaceCountryCode]],
        nextToken: nextToken,
        startDateTime: startDateTime,
        sellerSkus: sellerSkus,
      },
      options: {
        version: 'v1',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = getInventorySummaries
