const { getSellingPartnerAPI } = require('../utils');
const createNotificationSubscription = async (params) => {
  try {
    const { token, clientID, clientSecret,region, destinationId, notificationType } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createSubscription',
      endpoint: 'notifications',
      body: {
        destinationId: destinationId,
        payloadVersion: "1.0"
      },
      options: {
        version: 'v1',
      },
      path:{
        notificationType,
      }
    })
    return response
  } catch (err) {
    return err
  }
}
module.exports = createNotificationSubscription
