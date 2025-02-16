const { getSellingPartnerAPI } = require('../utils')
const getListingItem = async (params) => {
  try {
    const { token, clientID, clientSecret, region, sellerId, marketplaceId, sku } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getListingsItem',
      endpoint: 'listingsItems',
      path: {
        sellerId,
        sku,
      },
      query: {
        marketplaceIds: [marketplaceId],
      },
      options: {
        version: '2021-08-01',
      },
    })
    return response
  } catch (err) {
    return err
  }
}
module.exports = getListingItem
