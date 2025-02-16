const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation

const getAllCustomers = async (params) => {
  let { apiKey, apiSecret, marketplaceId, showInActive } = params

  Shipstation.apiKey = apiKey || Shipstation.apiKey
  Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const axiosConfig = {
    method: 'GET',
    url: `${Shipstation.baseUrl}/customers`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
    },
    params: {
      showInActive: showInActive,
      marketplaceId: marketplaceId,
    },
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAllCustomers
