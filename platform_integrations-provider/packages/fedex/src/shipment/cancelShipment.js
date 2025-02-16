const axios = require('axios').default
const config = require('@/config/config')
const getToken = require('../config/auth')

let FEDEX_ACCOUNT_NUMBER = config.FEDEX_ACCOUNT_NUMBER
let FEDEX_API_BASEURL = config.FEDEX_API_BASEURL

const cancelShipment = async (params) => {
  try {
    const { clientId, secretKey, trackingNumber, accountNumber, apiBaseURL } = params
    const token = getToken(apiBaseURL, clientId, secretKey)

    FEDEX_ACCOUNT_NUMBER = accountNumber || FEDEX_ACCOUNT_NUMBER
    FEDEX_API_BASEURL = apiBaseURL || FEDEX_API_BASEURL
    const config = {
      method: 'put',
      url: `${FEDEX_API_BASEURL}/ship/v1/shipments/cancel`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        accountNumber: {
          value: FEDEX_ACCOUNT_NUMBER,
        },
        trackingNumber: trackingNumber,
      },
    }
    console.log(config.data)
    const response = await axios(config)
    return response.data.output
  } catch (err) {
    return err
    // res.status(err.response.status).send(err.response.data)
  }
}

module.exports = cancelShipment
