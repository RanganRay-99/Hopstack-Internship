const axios = require('axios').default
const config = require('../config/config')
const { ejen2u } = config

let EJEN2U_TOKEN = ejen2u.EJEN2U_TOKEN
let EJEN2U_BASE_URL = ejen2u.EJEN2U_BASE_URL

const orderList = async (params) => {
  try {
    const { baseUrl, token, startDate, endDate} = params
    EJEN2U_BASE_URL = baseUrl || EJEN2U_BASE_URL
    EJEN2U_TOKEN = token || EJEN2U_TOKEN
    // console.log(new Date().toJSON().slice(0, 10))

    const axiosConfig = {
      method: 'GET',
      url: `${EJEN2U_BASE_URL}/api/data-order`,
      headers: {
        Authorization: `Bearer ${EJEN2U_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params:{
        token: EJEN2U_TOKEN,
        start_date: startDate,
        end_date: endDate
      }
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = orderList