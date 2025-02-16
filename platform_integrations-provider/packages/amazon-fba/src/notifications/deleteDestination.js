const { getSellingPartnerAPI } = require('../utils')
const deleteDestination = async (params) => {
  try {
    const { token, clientID, clientSecret, region, destinationId } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'deleteDestination',
      endpoint: 'notifications',
      path: { destinationId },
      options: {
        version: 'v1',
      },
    })
    return response
  } catch (err) {
    return err
  }
}
module.exports = deleteDestination
