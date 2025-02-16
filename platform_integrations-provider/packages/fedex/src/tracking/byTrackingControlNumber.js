const axios = require('axios').default
const config = require('@/config/config')
const getToken = require('../config/auth')

let FEDEX_API_BASEURL = config.FEDEX_API_BASEURL

const trackByTrackingControlNumber = async (params) => {
  try {
    const { clientId, secretKey, tcn, shipDateBegin, apiBaseURL } = params
    const token = getToken(apiBaseURL, clientId, secretKey)
    FEDEX_API_BASEURL = apiBaseURL || FEDEX_API_BASEURL
    const config = {
      method: 'post',
      url: `${FEDEX_API_BASEURL}/track/v1/tcn`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        tcnInfo: {
          value: tcn,
          shipDateBegin: shipDateBegin,
        },
      },
    }
    const response = await axios(config)
    return response.data.output.completeTrackResults
  } catch (err) {
    return err
    // res.status(err.response.status).send(err.response.data)
  }
}

module.exports = trackByTrackingControlNumber
