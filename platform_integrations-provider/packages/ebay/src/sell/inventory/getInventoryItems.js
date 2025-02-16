const getToken  = require('@/auth/getToken')

const axios = require('axios').default



const getInventoryItems = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, limit, offset } = params
    const {access_token} = await getToken({clientId, clientSecret, refreshToken})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/inventory/v1/inventory_item`,
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

module.exports = getInventoryItems