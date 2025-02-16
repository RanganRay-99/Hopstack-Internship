const { getSellingPartnerAPI } = require('../utils')
const getAllNotificationSubscriptionsByNotificationType = async (params) => {
  try {
    const { token, clientID, clientSecret, region, notificationType } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getSubscription',
      endpoint: 'notifications',
      options: {
        version: 'v1',
      },
      path: {
        notificationType,
      },
    })
    return response
  } catch (err) {
    return err
  }
}
module.exports = getAllNotificationSubscriptionsByNotificationType
