const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getLocations = async (params) => {
  try {
    const { apiUrl } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'GET',
      url: `${SHOPIFY_BASEURL}/locations.json`,
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

module.exports = getLocations
