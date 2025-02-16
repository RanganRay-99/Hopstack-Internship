const { getToken } = require('@/index')

const axios = require('axios').default



const fetchEvienceContent = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, payment_dispute_id, evidence_id, file_id} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://apiz.ebay.com/sell/fulfillment/v1/payment_dispute/${payment_dispute_id}/fetch_evidence_content`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        evidence_id,
        file_id,
        payment_dispute_id
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = fetchEvienceContent