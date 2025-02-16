const axios = require('axios').default
const URL = require('url')

const getTokenViaAuthCode = async (params) => {
  try {
    const { clientId, clientSecret, code, redirectUri } = params

    const data_body = new URL.URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
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

module.exports = getTokenViaAuthCode
