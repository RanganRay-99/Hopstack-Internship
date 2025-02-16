const { getToken } = require('@/index')

const axios = require('axios').default


const createInventoryLocation = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, merchantLocationKey } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data ={
        merchantLocationKey,
    } 
        
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/location/${merchantLocationKey}/disable`,
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

module.exports = createInventoryLocation