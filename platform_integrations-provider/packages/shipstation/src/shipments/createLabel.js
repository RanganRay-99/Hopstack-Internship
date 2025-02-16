const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation 

const createLabel = async (params) => {
  let { 
    carrierCode,
    serviceCode,
    packageCode,
    confirmation,
    shipDate,
    weight,
    // weightValue,
    // weightUnits,
    dimensions,
    // dimensionsUnits,
    // dimensionsLength,
    // dimensionsHeight,
    // dimensionsWidth,
    fromAddress,
    // shipFromName,
    // shipFromCompany,
    // shipFromStreet1,
    // shipFromStreet2,
    // shipFromStreet3,
    // shipFromCity,
    // shipFromState,
    // shipFromPostalCode,
    // shipFromCountry,
    // shipFromPhone,
    // shipFromResidential,
    toAddress,
    // shipToName,
    // shipToCompany,
    // shipToStreet1,
    // shipToStreet2,
    // shipToStreet3,
    // shipToCity,
    // shipToState,
    // shipToPostalCode,
    // shipToCountry,
    // shipToPhone,
    // shipToResidential,
    insuranceOptionProvider,
    insuranceOptionsInsureShipment,
    insuranceOptionsInsuredValue,
    internationalOptions,
    advancedOptions,
    testLabel,
    apiKey,
    apiSecret
   } = params

   Shipstation.apiKey = apiKey || Shipstation.apiKey
   Shipstation.apiSecret = apiSecret || Shipstation.apiSecret


  const data = {
    carrierCode: carrierCode,
    serviceCode: serviceCode,
    packageCode: packageCode,
    confirmation: confirmation,
    shipDate: shipDate,
    weight:{
      value: weight.value,
      units: weight.units
    },
    dimensions:{
      units: dimensions.units,
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height
    },
    shipFrom:{
      name: fromAddress.name,
      company: fromAddress.company,
      street1: fromAddress.street1,
      street2: fromAddress.street2,
      street3: fromAddress.street3,
      city: fromAddress.city,
      state: fromAddress.state,
      postalCode: fromAddress.postcode,
      country: fromAddress.country,
      phone: fromAddress.phone,
      residential: fromAddress.residential
    },
    shipTo:{
      name: toAddress.name,
      company: toAddress.company,
      street1: toAddress.street1,
      street2: toAddress.street2,
      street3: toAddress.street3,
      city: toAddress.city,
      state: toAddress.state,
      postalCode: toAddress.postcode,
      country: toAddress.country,
      phone: toAddress.phone,
      residential: toAddress.residential
    },
    insuranceOptions:{
      provider: insuranceOptionProvider,
      insureShipment: insuranceOptionsInsureShipment,
      insuredValue: insuranceOptionsInsuredValue
    },
    internationalOptions: internationalOptions,
    advancedOptions: advancedOptions,
    testLabel: testLabel
  }

  const axiosConfig = {
    method: 'POST',
    url: `${Shipstation.baseUrl}/shipments/createlabel`,
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
    return err.response.data
  }
}

module.exports = createLabel
