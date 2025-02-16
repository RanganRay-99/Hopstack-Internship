const { getSellingPartnerAPI } = require('@/utils')

const getPrepInstructions = async (params) => {
  try {
    const { token, clientID, clientSecret, shipToCountryCode, asin, sellerSKU, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getPrepInstructions',
      endpoint: 'fulfillmentInbound',
      query: {
        ShipToCountryCode: shipToCountryCode,
        ASINList: [asin],
        SellerSKUList: [sellerSKU],
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

module.exports = getPrepInstructions
