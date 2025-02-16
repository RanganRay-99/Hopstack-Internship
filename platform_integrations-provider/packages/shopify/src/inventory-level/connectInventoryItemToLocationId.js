const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const connectInventoryItemToLocationId = async (params) => {
  try {
    const { apiUrl, locationId, inventoryItemId } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = { location_id: locationId, inventory_item_id: inventoryItemId }

    const axiosConfig = {
      method: 'post',
      url: `${SHOPIFY_BASEURL}/inventory_levels/connect.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = connectInventoryItemToLocationId