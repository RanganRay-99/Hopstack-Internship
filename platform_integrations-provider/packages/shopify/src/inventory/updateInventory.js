const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const updateInventory = async (params) => {
  try {
    const { apiUrl, inventoryId, sku } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = { inventory_item: { id: inventoryId, sku } }
    const axiosConfig = {
      method: 'put',
      url: `${SHOPIFY_BASEURL}/inventory_items/${inventoryId}.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateInventory
