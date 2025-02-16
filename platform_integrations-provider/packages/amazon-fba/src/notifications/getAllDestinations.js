const { getSellingPartnerAPI } = require('../utils')
const getAllDestinations = async (params) => {
  try {
    const { token, clientID, clientSecret, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getDestinations',
      endpoint: 'notifications',
      options: {
        version: 'v1',
      },
    })
    console.log({ token, clientID, clientSecret, region })
    return response
  } catch (err) {
    return err
  }
}
module.exports = getAllDestinations
