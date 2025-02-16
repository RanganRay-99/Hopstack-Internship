const { getSellingPartnerAPI } = require('@/utils')

const cancelFeed = async (params) => {
  try {
    const { token, clientID, clientSecret, feedId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'cancelFeed',
      endpoint: 'feeds',
      path: {
        feedId,
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

module.exports = cancelFeed
