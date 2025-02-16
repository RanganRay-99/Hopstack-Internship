const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getReports = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      reportTypes,
      processingStatuses,
      marketplaceCountryCode,
      pageSize,
      createdSince,
      createdUntil,
      nextToken,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getReports',
      endpoint: 'reports',
      query: {
        reportTypes,
        processingStatuses,
        marketplaceIds: [MarketPlaces[marketplaceCountryCode]],
        pageSize,
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

module.exports = getReports
