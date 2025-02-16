const { getToken } = require('@/index')

const axios = require('axios').default



const getInventoryLocations = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, limit, offset } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/inventory/v1/location`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      query: {
        limit,
        offset,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getInventoryLocations