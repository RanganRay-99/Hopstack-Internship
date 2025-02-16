const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const getOrderDetail = async (params) => {
  const { secretKey, orderId } = params
  const body = {
    secretkey: secretKey,
    order_identifier: orderId,
  }

  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/order/get_order_detail`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData.toString(),
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getOrderDetail
