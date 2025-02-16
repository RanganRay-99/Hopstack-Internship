const { getToken } = require('@/index')

const axios = require('axios').default



const acceptPaymentDispute = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, payment_dispute_id, addressLine1, addressLine2, city,
    country, county, fullName, postalCode, countryCode, number, stateOrProvince, revision } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        returnAddress:{
            addressLine1,
            addressLine2,
            city,
            country,
            county,
            fullName,
            postalCode,
            primaryPhone:{
                countryCode,
                number,
            },
            stateOrProvince,

        },
        revision,
    }
    const axiosConfig = {
      method: 'post',
      url: `https://apiz.ebay.com/sell/fulfillment/v1/payment_dispute/${payment_dispute_id}/accept`,
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

module.exports = acceptPaymentDispute