const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getScheduledPackage = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, amazonOrderId, region } = params

    const query = {
      amazonOrderId,
      marketplaceId: MarketPlaces[marketplaceCountryCode],
    }

    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getScheduledPackage',
      endpoint: 'easyShip',
      options: {
        version: '2022-03-23',
      },
      query,
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = getScheduledPackage
