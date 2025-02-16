const { getSellingPartnerAPI } = require('@/utils')

const createFeedDocument = async (params) => {
  try {
    const { token, clientID, clientSecret, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createFeedDocument',
      endpoint: 'feeds',
      body: {
        contentType: 'text/xml; charset=UTF-8',
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

module.exports = createFeedDocument
