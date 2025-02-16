const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const markOrderShipped = async (params) => {
  const { secretKey, orderId } = params

  const body = {
    secretkey: secretKey,
    order_identifier: orderId,
  }
  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/order/set_order_status_to_shipped`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData.toString(),
  }
  let done = false
  let retries = 0
  let ret = null
  while (!done && retries < 50) {
    try {
      const response = await axios(axiosConfig)
      ret = response.data
      done = true
    } catch (err) {
      ret = err
      retries++
    }
  }
  return ret
}

module.exports = markOrderShipped
