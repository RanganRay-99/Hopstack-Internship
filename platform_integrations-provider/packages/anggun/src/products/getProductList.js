const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const getProductList = async (params) => {
  const { secretKey, startDate, endDate, timeRangeField, offset, limit } = params

  const body = {
    secretkey: secretKey,
    time_range_field: timeRangeField,
    time_from: startDate,
    time_to: endDate,
    page: offset,
    limit,
  }

  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/product/get_product_list`,
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

module.exports = getProductList
