const axios = require('axios').default
const config = require('./config/config')

let UPS_API_BASEURL = config.UPS_API_BASEURL
let UPS_ACCESS_KEY = config.UPS_ACCESS_KEY
let UPS_ACCOUNT_NUMBER = config.UPS_ACCOUNT_NUMBER
let UPS_PASSWORD = config.UPS_PASSWORD
let UPS_USERID = config.UPS_USERID

const trackShipment = async (params) => {
  const { tracking_no, apiBaseURL, accessKey, accountNumber, password, userid } = params
  UPS_API_BASEURL = apiBaseURL || UPS_API_BASEURL
  UPS_ACCESS_KEY = accessKey || UPS_ACCESS_KEY
  UPS_ACCOUNT_NUMBER = accountNumber || UPS_ACCOUNT_NUMBER
  UPS_PASSWORD = password || UPS_PASSWORD
  UPS_USERID = userid || UPS_USERID

  const axiosConfig = {
    method: 'get',
    url: `${UPS_API_BASEURL}/track/v1/details/${tracking_no}`,
    headers: {
      AccessLicenseNumber: UPS_ACCESS_KEY,
    },
  }

  try {
    let response = await axios(axiosConfig)
    if (response.data.errors) {
      return response.data.errors[0]
    } else {
      return response.data.trackResponse.shipment[0]
    }
  } catch (err) {
    return err
  }
}

module.exports = trackShipment
