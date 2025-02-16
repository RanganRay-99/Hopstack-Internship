const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getCatalogItem = async (params) => {
  try {
    const { token, clientID, clientSecret, asin, marketplaceCountryCode, query, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getCatalogItem',
      endpoint: 'catalogItems',
      path: {
        asin: asin,
      },
      query: {
        marketplaceIds: [MarketPlaces[marketplaceCountryCode]],
        includedData: 'attributes,identifiers,images,productTypes,summaries',
        Query: query,
      },
      options: {
        version: '2020-12-01',
      },
    })
    if (response.attributes) {
      response.attributes = JSON.stringify(response.attributes)
    }
    return response
  } catch (err) {
    return err
  }
}

module.exports = getCatalogItem
