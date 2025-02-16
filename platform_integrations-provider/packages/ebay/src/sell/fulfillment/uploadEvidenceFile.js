const { getToken } = require('@/index')

const axios = require('axios').default



const uploadEvidenceFile = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, payment_dispute_id, fileId } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        fileId,
    }
    const axiosConfig = {
      method: 'post',
      url: `https://apiz.ebay.com/sell/fulfillment/v1/payment_dispute/${payment_dispute_id}/upload_evidence_file`,
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

module.exports = uploadEvidenceFile