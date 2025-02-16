const { getSellingPartnerAPI } = require('@/utils')

const getFeedDocument = async (params) => {
  try {
    const { token, clientID, clientSecret, feedDocumentId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getFeedDocument',
      endpoint: 'feeds',
      path: {
        feedDocumentId,
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

module.exports = getFeedDocument
