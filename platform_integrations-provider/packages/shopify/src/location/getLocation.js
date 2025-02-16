const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getLocation = async (params) => {
  try {
    const { apiUrl, locationId } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'GET',
      url: `${SHOPIFY_BASEURL}/locations/${locationId}.json`,
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

module.exports = getLocation
