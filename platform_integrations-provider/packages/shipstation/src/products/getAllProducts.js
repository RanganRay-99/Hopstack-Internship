const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation

const getAllProducts = async (params) => {
  let { apiKey, apiSecret, sku, productCategoryId, productTypeId, showInactive, startDate, endDate } = params

  Shipstation.apiKey = apiKey || Shipstation.apiKey
  Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const axiosConfig = {
    method: 'GET',
    url: `${Shipstation.baseUrl}/products`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
    },
    params: {
      startDate,
      endDate,
      sku,
      productCategoryId,
      productTypeId,
      showInactive,
    },
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAllProducts
