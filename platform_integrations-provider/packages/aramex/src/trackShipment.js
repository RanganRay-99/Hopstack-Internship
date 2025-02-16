const axios = require('axios').default
const config = require('@/config/config')

let Aramex = config.aramex

const trackShipment = async (params) => {
  const { apiBaseURL, username, password, accountNumber, accountPin, accountEntity, accountCountryCode, trackingNum } =
    params

  Aramex.baseUrl = apiBaseURL || Aramex.baseUrl
  Aramex.username = username || Aramex.username
  Aramex.password = password || Aramex.password
  Aramex.account.number = accountNumber || Aramex.account.number
  Aramex.account.pin = accountPin || Aramex.account.pin
  Aramex.account.entity = accountEntity || Aramex.account.entity
  Aramex.account.countryCode = accountCountryCode || Aramex.account.countryCode

  const data = {
    ClientInfo: {
      UserName: Aramex.username,
      Password: Aramex.password,
      Version: 'v1.0',
      AccountNumber: Aramex.account.number,
      AccountPin: Aramex.account.pin,
      AccountEntity: Aramex.account.entity,
      AccountCountryCode: Aramex.account.countryCode,
    },
    Transaction: null,
    Shipments: [trackingNum.toString()],
    GetLastTrackingUpdateOnly: false,
  }

  const axiosConfig = {
    method: 'post',
    url: `${Aramex.baseUrl}/Tracking/Service_1_0.svc/json/TrackShipments`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }

  try {
    let response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = trackShipment
