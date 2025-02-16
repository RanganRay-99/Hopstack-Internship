const axios = require('axios').default
const config = require('@/config/config')
const getToken = require('../config/auth')

let FEDEX_API_BASEURL = config.FEDEX_API_BASEURL

const trackByTrackingNumber = async (params) => {
  try {
    const { clientId, secretKey, trackingNumber, apiBaseURL } = params
    const token = getToken(apiBaseURL, clientId, secretKey)
    FEDEX_API_BASEURL = apiBaseURL || FEDEX_API_BASEURL
    const config = {
      method: 'post',
      url: `${FEDEX_API_BASEURL}/track/v1/trackingnumbers`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        trackingInfo: [
          {
            trackingNumberInfo: {
              trackingNumber: trackingNumber,
            },
          },
        ],
        includeDetailedScans: true,
      },
    }
    const response = await axios(config)
    return response.data.output.completeTrackResults
  } catch (err) {
    return err
    // res.status(err.response.status).send(err.response.data);
  }
}

module.exports = trackByTrackingNumber
