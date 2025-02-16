const { getSellingPartnerAPI } = require('../utils')
const createDestination = async (params) => {
  try {
    const { token, clientID, clientSecret, region, destinationName, accountId, queueRegion } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createDestination',
      endpoint: 'notifications',
      body: {
        resourceSpecification: {
          eventBridge: {
            accountId,
            region: queueRegion,
          },
        },
        name: destinationName,
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
module.exports = createDestination
