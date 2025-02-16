const { getToken } = require('@/index')

const axios = require('axios').default


const publishOfferByInventoryItemGroup = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, inventoryItemGroupKey, marketplaceId} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        inventoryItemGroupKey,
        marketplaceId, 
      }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/offer/publish_by_inventory_item_group`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = publishOfferByInventoryItemGroup