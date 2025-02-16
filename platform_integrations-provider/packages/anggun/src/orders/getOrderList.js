const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const getOrderList = async (params) => {
  const { secretKey, startDate, endDate, orderStatus, customerId, offset, limit } = params
  const body = {
    secretkey: secretKey,
    time_from: startDate,
    time_to: endDate,
    order_status: orderStatus,
    customer_identifier: customerId,
    page: offset,
    limit,
  }
  
  for (const key in body) {
    if (body[key] === undefined) {
      delete body[key]
    }
  }

  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/order/get_order_list`,
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

module.exports = getOrderList
