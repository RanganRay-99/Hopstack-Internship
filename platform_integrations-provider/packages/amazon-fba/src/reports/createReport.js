const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const createReport = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      reportOptions,
      reportType,
      dataStartTime,
      dataEndTime,
      marketplaceCountryCode,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createReport',
      endpoint: 'reports',
      body: {
        reportOptions,
        reportType,
        dataStartTime,
        dataEndTime,
        marketplaceIds: [MarketPlaces[marketplaceCountryCode]],
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

module.exports = createReport
