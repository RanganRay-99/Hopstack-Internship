const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const adjustQuantityOfInventoryItemByLocationId = async (params) => {
  try {
    const { apiUrl, locationId, inventoryItemId, availableAdjustmentQuantity } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {
      location_id: locationId,
      inventory_item_id: inventoryItemId,
      available_adjustment: availableAdjustmentQuantity,
    }

    const axiosConfig = {
      method: 'post',
      url: `${SHOPIFY_BASEURL}/inventory_levels/adjust.json`,
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

module.exports = adjustQuantityOfInventoryItemByLocationId