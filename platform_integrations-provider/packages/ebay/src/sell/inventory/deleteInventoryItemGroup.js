const { getToken } = require('@/index')

const axios = require('axios').default



const deleteInventoryItemGroup = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, inventoryItemGroupKey } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    
    const axiosConfig = {
      method: 'delete',
      url: `https://api.ebay.com/sell/inventory/v1/inventory_item_group/${inventoryItemGroupKey}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = deleteInventoryItemGroup