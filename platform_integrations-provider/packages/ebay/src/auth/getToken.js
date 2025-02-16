const axios = require('axios').default
const URL = require('url')

const getToken = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken } = params
    const scopes = [
      'https://api.ebay.com/oauth/api_scope',
      'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
      'https://api.ebay.com/oauth/api_scope/sell.marketing',
      'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
      'https://api.ebay.com/oauth/api_scope/sell.inventory',
      'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
      'https://api.ebay.com/oauth/api_scope/sell.account',
      'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
      'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
      'https://api.ebay.com/oauth/api_scope/sell.analytics.readonly',
      'https://api.ebay.com/oauth/api_scope/sell.finances',
      'https://api.ebay.com/oauth/api_scope/sell.payment.dispute',
      'https://api.ebay.com/oauth/api_scope/commerce.identity.readonly',
      'https://api.ebay.com/oauth/api_scope/commerce.notification.subscription',
      'https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly',
    ]

    const data_body = new URL.URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: scopes.join(' '),
    })

    const url = 'https://api.ebay.com/identity/v1/oauth2/token'

    const axiosConfig = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const response = await axios.post(url, data_body, axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

/////////////////TEST
// (async () => {
//   const ebay_REFRESH_TOKEN = config.ebay.refreshToken
//   const EBAY_APP_CLIENT_ID = config.ebay.client_id
//   const EBAY_APP_CLIENT_SECRET = config.ebay.client_secret
//   var param = {
//     clientId: EBAY_APP_CLIENT_ID,
//     clientSecret: EBAY_APP_CLIENT_SECRET,
//     refreshToken: ebay_REFRESH_TOKEN
//   }
//   var data = await getToken(param);
//   console.log(data)
// })();
/////////////////

module.exports = getToken
