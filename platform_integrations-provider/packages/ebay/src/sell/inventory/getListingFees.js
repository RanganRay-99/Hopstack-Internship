const { getToken } = require('@/index')

const axios = require('axios').default



const getListingFees = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, offerId} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        offers: [
          {
            offerId,
          }
        ]
      }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/offer/get_listing_fees`,
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

module.exports = getListingFees