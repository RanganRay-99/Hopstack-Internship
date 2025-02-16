const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation 

const getShipmentRates = async (params) => {
  let { 
    carrierCode,
    serviceCode,
    packageCode,
    // fromPostalCode,
    fromAddress,
    // toState,
    // toCountry,
    // toPostalCode,
    // toCity,
    toAddress,
    // weightValue,
    // weightUnits,
    weight,
    // dimensionsUnits,
    // dimensionsLength,
    // dimensionsWidth,
    // dimensionsHeight,
    dimensions,
    confirmation,
    residential,
    apiKey,
    apiSecret
   } = params

   Shipstation.apiKey = apiKey || Shipstation.apiKey
   Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const data = {
    carrierCode: carrierCode,
    serviceCode: serviceCode,
    packageCode: packageCode,
    fromPostalCode: fromAddress.postcode,
    toState: toAddress.state,
    toCountry: toAddress.country,
    toPostalCode: toAddress.postcode,
    toCity: toAddress.city,
    weight: {
      value: weight.value,
      units: weight.units,
    },
    dimensions:{
      units: dimensions.units,
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height
    },
    confirmation: confirmation,
    residential: residential
  }

  const axiosConfig = {
    method: 'POST',
    url: `${Shipstation.baseUrl}/shipments/getrates`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
    },
    data,
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getShipmentRates
