const config = require('@/config/config')
const { getToken } = require('../../src')
const testFunction = async () => {
  try {
    const ebay_REFRESH_TOKEN = config.ebay.refresh_token
    const EBAY_APP_CLIENT_ID = config.ebay.client_id
    const EBAY_APP_CLIENT_SECRET = config.ebay.client_secret
    var param = {
      clientId: EBAY_APP_CLIENT_ID,
      clientSecret: EBAY_APP_CLIENT_SECRET,
      refreshToken: ebay_REFRESH_TOKEN
    }

    const response = await getToken(params)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

testFunction()
