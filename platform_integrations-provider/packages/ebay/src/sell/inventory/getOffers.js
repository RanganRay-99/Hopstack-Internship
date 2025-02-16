const { getToken } = require('@/index')

const axios = require('axios').default



const getOffers = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, sku, marketplace_id, format, limit, offset } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/inventory/v1/offer`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      query: {
        sku,
        marketplace_id,
        format,
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

module.exports = getOffers