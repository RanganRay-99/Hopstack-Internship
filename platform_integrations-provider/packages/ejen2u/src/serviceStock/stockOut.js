const axios = require('axios').default
const config = require('../config/config')
const { ejen2u } = config

let EJEN2U_TOKEN = ejen2u.EJEN2U_TOKEN
let EJEN2U_BASE_URL = ejen2u.EJEN2U_BASE_URL

const stockOut = async (params) => {
  try {
    const { baseUrl, token, productId, lastStock, qty } = params
    EJEN2U_BASE_URL = baseUrl || EJEN2U_BASE_URL
    EJEN2U_TOKEN = token || EJEN2U_TOKEN
    const data = {
      token: EJEN2U_TOKEN.toString(),
      product_id: productId.toString(),
      last_stock: lastStock.toString(),
      qty: qty.toString(),
    }
    const paramsData = new URLSearchParams()

    for (const key in data) {
      paramsData.append(key, data[key])
    }

    const response = await axios.post(`${EJEN2U_BASE_URL}/api/stock-out`, paramsData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = stockOut
