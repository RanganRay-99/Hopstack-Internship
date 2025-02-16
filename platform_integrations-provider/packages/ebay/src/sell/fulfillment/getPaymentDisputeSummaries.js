const { getToken } = require('@/index')

const axios = require('axios').default



const getPaymentDisputeSummaries = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, order_Id, buyer_username, open_date_from, open_date_to, payment_dispute_status, limit, offset} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://apiz.ebay.com/sell/fulfillment/v1/payment_dispute_summary`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        order_Id,
        buyer_username,
        open_date_from,
        open_date_to,
        payment_dispute_status,
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

module.exports = getPaymentDisputeSummaries