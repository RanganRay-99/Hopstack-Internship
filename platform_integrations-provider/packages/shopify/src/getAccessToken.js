const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getAccessToken = async (params) => {
  try {
    const { apiUrl } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'get',
      url: `${SHOPIFY_BASEURL}/storefront_access_tokens.json`,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAccessToken
