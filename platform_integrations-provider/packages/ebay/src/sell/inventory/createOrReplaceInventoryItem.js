const getToken  = require('@/auth/getToken')

const axios = require('axios').default



const createOrReplaceInventoryItem = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, inventoryId, sku } = params
    const {access_token} = await getToken({clientId, clientSecret, refreshToken})
    
    const axiosConfig = {
      method: 'PUT',
      url: `https://api.ebay.com/sell/inventory/v1/inventory_item/${inventoryId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      data:{}
    };
    const response = await axios.put(axiosConfig.url,axiosConfig.data,axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = createOrReplaceInventoryItem