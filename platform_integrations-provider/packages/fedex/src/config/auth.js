const axios = require('axios').default
const url = require('url')
const config = require('@/config/config')

const FEDEX_API_BASEURL = config.FEDEX_API_BASEURL
const FEDEX_CLIENT_ID = config.FEDEX_CLIENT_ID
const FEDEX_SECRET_KEY = config.FEDEX_SECRET_KEY

const getToken = async (baseUrl, clientId, secretKey) => {
  // let token = await cache.get("fedex_token");
  // if (token) {
  //   return token;
  // }
  const params = new url.URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: secretKey,
  })
  var config = {
    method: 'post',
    url: `${baseUrl}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: params.toString(),
  }
  try {
    const response = await axios(config)
    // await cache.set("fedex_token", req.token, response.data.expires_in);
    return response.data.access_token
  } catch (err) {
    console.log(`Error while geting fedex token`)
    console.log(err.response.data)
    return err.response.status.toString() + " " + err.response.data.toString()
  }
}

module.exports = getToken
