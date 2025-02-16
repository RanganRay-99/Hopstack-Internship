const { getToken } = require('@/index')

const axios = require('axios').default



const addEvidence = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, payment_dispute_id,fileId, itemId, lineItemId,  } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        payment_dispute_id,
        evidenceType:[],
        files:[
            {
                fileId,
            }
        ],
        lineItems:[
            {
                itemId,
                lineItemId,
            }
        ],
    }
    const axiosConfig = {
      method: 'post',
      url: `https://apiz.ebay.com/sell/fulfillment/v1/payment_dispute/${payment_dispute_id}/add_evidence`,
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

module.exports = addEvidence