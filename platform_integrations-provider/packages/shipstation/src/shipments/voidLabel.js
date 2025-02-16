const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation 

const voidLabel = async (params) => {
  let { 
    shipmentId,
    apiKey,
    apiSecret
   } = params

  Shipstation.apiKey = apiKey || Shipstation.apiKey
  Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const data = {
    shipmentId: shipmentId
  }

  const axiosConfig = {
    method: 'POST',
    url: `${Shipstation.baseUrl}/shipments/voidlabel`,
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

module.exports = voidLabel
