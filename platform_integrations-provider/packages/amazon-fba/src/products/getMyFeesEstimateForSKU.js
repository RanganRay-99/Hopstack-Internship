const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getMyFeesEstimateForSKU = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      sellerSKU,
      marketplaceCountryCode,
      currencyCode,
      amount,
      identifier,
      isAmazonFulfilled,
      optionalFulfillmentProgram,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getMyFeesEstimateForSKU',
      endpoint: 'productFees',
      path: {
        SellerSKU: sellerSKU,
      },
      body: {
        FeesEstimateRequest: {
          MarketplaceId: MarketPlaces[marketplaceCountryCode],
          PriceToEstimateFees: {
            ListingPrice: {
              CurrencyCode: currencyCode,
              Amount: amount,
            },
            // Shipping: {
            //   CurrencyCode: "in dolore irure",
            //   Amount: -65981912.03517389,
            // },
            // Points: {
            //   PointsNumber: 72389376,
            //   PointsMonetaryValue: {
            //     CurrencyCode: "dolor Ut",
            //     Amount: -57039217.250816375,
            //   },
            // },
          },
          Identifier: identifier,
          IsAmazonFulfilled: isAmazonFulfilled,
          OptionalFulfillmentProgram: optionalFulfillmentProgram, // FBA_CORE | FBA_SNL | FBA_EFN
        },
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

module.exports = getMyFeesEstimateForSKU
