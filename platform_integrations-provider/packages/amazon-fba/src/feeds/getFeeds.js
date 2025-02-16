const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getFeeds = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      feedTypes,
      marketplaceCountryCodes,
      pageSize,
      processingStatuses,
      createdSince,
      createdUntil,
      nextToken,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getFeeds',
      endpoint: 'feeds',
      query: {
        feedTypes,
        marketplaceIds: marketplaceCountryCodes.map((code) => MarketPlaces[code]),
        pageSize,
        processingStatuses, // CANCELLED | DONE | FATAL | IN_PROGRESS | IN_QUEUE
        createdSince,
        createdUntil,
        nextToken,
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

module.exports = getFeeds
