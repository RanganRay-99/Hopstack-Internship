const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const createFeed = async (params) => {
  try {
    const { token, clientID, clientSecret, feedType, marketplaceCountryCodes, inputFeedDocumentId, feedOptions, region } =
      params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createFeed',
      endpoint: 'feeds',
      body: {
        feedType,
        marketplaceIds: marketplaceCountryCodes.map((code) => MarketPlaces[code]),
        inputFeedDocumentId,
        feedOptions,
      },
      options: {
        version: '2021-06-30',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = createFeed
