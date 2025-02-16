const axios = require('axios').default
const config = require('@/config/config')
const uploadShipmentLabelPDF = require('./utils/uploadShipmentLabelPDF.js')

let Aramex = config.aramex

const getLabel = async (params) => {
  const { apiBaseURL, username, password, accountNumber, accountPin, accountEntity, accountCountryCode, shipmentID } = params

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
    ShipmentNumber: shipmentID,
    LabelInfo: {
      ReportID: '9201',
      ReportType: 'RPT',
    },
  }

  const axiosConfig = {
    method: 'post',
    url: `${Aramex.baseUrl}/Shipping/Service_1_0.svc/json/PrintLabel`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }

  try {
    let response = await axios(axiosConfig)
    const numArray = new Uint32Array(response.data.ShipmentLabel.LabelFileContents) //;
    const buf = Buffer.from(numArray)
    let labelUrl = await uploadShipmentLabelPDF(buf, shipmentID)
    response.data.ShipmentLabel.LabelURL = labelUrl
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getLabel
