const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation 

const listServices = async (params) => {
  let { 
    apiKey,
    apiSecret,
    carrierCode
   } = params

   Shipstation.apiKey = apiKey || Shipstation.apiKey
   Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const axiosConfig = {
    method: 'GET',
    url: `${Shipstation.baseUrl}/carriers/listservices`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
    },
    params: {
      carrierCode
    }
  }
  
  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = listServices
