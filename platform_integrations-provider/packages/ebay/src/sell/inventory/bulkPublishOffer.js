const { getToken } = require('@/index')

const axios = require('axios').default



const bulkPublishOffer = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, offerId} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        requests:[{
            offerId,
        }],

    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/bulk_publish_offer`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = bulkPublishOffer