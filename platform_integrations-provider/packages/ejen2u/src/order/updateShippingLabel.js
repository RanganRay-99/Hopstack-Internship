const axios = require('axios').default
const config = require('../config/config')
const { ejen2u } = config

let EJEN2U_TOKEN = ejen2u.EJEN2U_TOKEN
let EJEN2U_BASE_URL = ejen2u.EJEN2U_BASE_URL

const updateShippingLabel = async (params) => {
  try {
    const { baseUrl, token, orderId, url, trackingId, pickupDate, courierCompany } = params
    EJEN2U_BASE_URL = baseUrl || EJEN2U_BASE_URL
    EJEN2U_TOKEN = token || EJEN2U_TOKEN
    // console.log(new Date().toJSON().slice(0, 10))

    const axiosConfig = {
      method: 'POST',
      url: `${EJEN2U_BASE_URL}/api/update-shipping-label`,
      headers: {
        Authorization: `Bearer ${EJEN2U_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        token: EJEN2U_TOKEN,
        order_id: orderId,
        url: url,
        tracking_id: trackingId,
        pickup_date: pickupDate,
        courier_company: courierCompany,
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateShippingLabel
