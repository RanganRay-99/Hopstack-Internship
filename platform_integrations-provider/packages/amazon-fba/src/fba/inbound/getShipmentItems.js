const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getShipmentItems = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, after, before, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getShipmentItems',
      endpoint: 'fulfillmentInbound',
      query: {
        QueryType: 'DATE_RANGE', //Enum: https://developer-docs.amazon.com/sp-api/docs/fulfillment-inbound-api-v0-reference#querytype
        MarketplaceId: MarketPlaces[marketplaceCountryCode],
        LastUpdatedAfter: after,
        LastUpdatedBefore: before,
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

module.exports = getShipmentItems
