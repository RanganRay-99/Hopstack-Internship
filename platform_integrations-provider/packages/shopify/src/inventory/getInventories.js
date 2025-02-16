const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getInventories = async (params) => {
  try {
    const { apiUrl, ids, limit } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'get',
      url: `${SHOPIFY_BASEURL}/inventory_items.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ids: ids.toString(),
        limit,
      }
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getInventories
