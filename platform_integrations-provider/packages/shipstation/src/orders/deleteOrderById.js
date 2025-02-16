const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation

const deleteOrderById = async (params) => {
  let { apiKey, apiSecret, orderId } = params

  Shipstation.apiKey = apiKey || Shipstation.apiKey
  Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const axiosConfig = {
    method: 'DELETE',
    url: `${Shipstation.baseUrl}/orders/${orderId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
    },
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = deleteOrderById
