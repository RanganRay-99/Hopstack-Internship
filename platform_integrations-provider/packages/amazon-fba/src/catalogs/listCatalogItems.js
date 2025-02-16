const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const listCatalogItems = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, query, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'listCatalogItems',
      endpoint: 'catalogItems',
      query: {
        MarketplaceId: MarketPlaces[marketplaceCountryCode],
        Query: query,
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

module.exports = listCatalogItems
