const axios = require('axios').default
const config = require('../config/config')
const { ejen2u } = config

let EJEN2U_TOKEN = ejen2u.EJEN2U_TOKEN
let EJEN2U_BASE_URL = ejen2u.EJEN2U_BASE_URL

const getProductByID = async (params) => {
  try {
    const { baseUrl, token, productId} = params
    EJEN2U_BASE_URL = baseUrl || EJEN2U_BASE_URL
    EJEN2U_TOKEN = token || EJEN2U_TOKEN
    var data = {
        product_id: productId
    }

    const axiosConfig = {
      method: 'POST',
      url: `${EJEN2U_BASE_URL}/api/get-product-by-id`,
      headers: {
        Authorization: `Bearer ${EJEN2U_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params:{
        token: EJEN2U_TOKEN,
      },
      data: data
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getProductByID