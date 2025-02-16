const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getShipments = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      shipmentIdList,
      marketplaceCountryCode,
      after,
      before,
      queryType,
      nextToken,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getShipments',
      endpoint: 'fulfillmentInbound',
      query: {
        ShipmentStatusList: [
          'WORKING',
          'SHIPPED',
          'RECEIVING',
          'CANCELLED',
          'DELETED',
          'CLOSED',
          'ERROR',
          'IN_TRANSIT',
          'DELIVERED',
          'CHECKED_IN',
        ],
        ShipmentIdList: shipmentIdList,
        QueryType: queryType, //Enum: https://developer-docs.amazon.com/sp-api/docs/fulfillment-inbound-api-v0-reference#querytype
        MarketplaceId: MarketPlaces[marketplaceCountryCode],
        LastUpdatedAfter: after,
        LastUpdatedBefore: before,
        NextToken: nextToken,
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

module.exports = getShipments
