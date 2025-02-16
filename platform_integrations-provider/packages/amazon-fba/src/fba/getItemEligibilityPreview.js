const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getItemEligibilityPreview = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, asin, program, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getItemEligibilityPreview',
      endpoint: 'fbaInboundEligibility',
      query: {
        marketplaceIds: [MarketPlaces[marketplaceCountryCode]],
        asin: asin,
        program: program,
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

module.exports = getItemEligibilityPreview
