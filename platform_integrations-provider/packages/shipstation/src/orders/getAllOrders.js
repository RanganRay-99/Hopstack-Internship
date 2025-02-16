const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation

const getAllOrders = async (params) => {
  let {
    apiKey,
    apiSecret,
    storeId,
    orderStatus,
    customerName,
    orderNumber,
    modifyDateStart,
    modifyDateEnd,
    orderDateStart,
    orderDateEnd,
  } = params

  Shipstation.apiKey = apiKey || Shipstation.apiKey
  Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const axiosConfig = {
    method: 'GET',
    url: `${Shipstation.baseUrl}/orders`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
    },
    params: {
      storeId,
      orderStatus,
      customerName,
      orderNumber,
      modifyDateStart,
      modifyDateEnd,
      orderDateStart,
      orderDateEnd,
    },
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAllOrders
