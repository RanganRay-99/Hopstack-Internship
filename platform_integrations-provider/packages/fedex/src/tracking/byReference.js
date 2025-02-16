const axios = require('axios').default
const config = require('@/config/config')
const getToken = require('../config/auth')
let FEDEX_API_BASEURL = config.FEDEX_API_BASEURL

const trackByReferences = async (params) => {
  try {
    const { 
      clientId, secretKey,
      type,
      value,
      accountNumber,
      carrierCode,
      shipDateBegin,
      shipDateEnd,
      destinationCountryCode,
      destinationPostalCode,
      apiBaseURL
    } = params
    const token = getToken(apiBaseURL, clientId, secretKey)
    FEDEX_API_BASEURL = apiBaseURL
    const config = {
      method: 'post',
      url: `${FEDEX_API_BASEURL}/track/v1/referencenumbers`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        referencesInformation: {
          type: type,
          value: value,
          accountNumber: accountNumber,
          carrierCode: carrierCode,
          shipDateBegin: shipDateBegin,
          shipDateEnd: shipDateEnd,
          destinationCountryCode: destinationCountryCode,
          destinationPostalCode: destinationPostalCode,
        },
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

module.exports = trackByReferences
