const { getToken } = require('@/index')

const axios = require('axios').default



const getPaymentDispute = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, payment_dispute_id} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://apiz.ebay.com/sell/fulfillment/v1/payment_dispute/${payment_dispute_id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        
        payment_dispute_id,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getPaymentDispute