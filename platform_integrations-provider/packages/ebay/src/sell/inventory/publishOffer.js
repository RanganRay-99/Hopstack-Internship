const { getToken } = require('@/index')

const axios = require('axios').default


const publishOffer = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token,listingId, category, domain, errorId, longMessage, message,name, value, subdomain, offerId} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        listingId,
        warnings: [
          {
            category,
            domain,
            errorId,
            inputRefIds: [
              
            ],
            longMessage,
            message,
            outputRefIds: [
              
            ],
            parameters: [
              {
                name,
                value,
              }
            ],
            subdomain,
          }
        ]
      }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/offer/${offerId}/publish`,
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

module.exports = publishOffer