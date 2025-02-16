const { getSellingPartnerAPI } = require('../utils');
const deleteNotificationSubscription = async (params) => {
  try {
    const { token, clientID, clientSecret,region , subscriptionId, notificationType} = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'deleteSubscriptionById',
      endpoint: 'notifications',
      options: {
        version: 'v1',
      },
      path:{
        notificationType,
        subscriptionId,
      }
    })
    return response
  } catch (err) {
    return err
  }
}
module.exports = deleteNotificationSubscription