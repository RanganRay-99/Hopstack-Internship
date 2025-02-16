const { getToken } = require('@/index')

const axios = require('axios').default



const getInventoryLocation = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, merchantLocationKey } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/inventory/v1/location/${merchantLocationKey}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      query: {
        merchantLocationKey,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getInventoryLocation