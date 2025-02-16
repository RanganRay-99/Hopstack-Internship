const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const getCategoryList = async (params) => {
  const { secretKey } = params
  const body = {
    secretkey: secretKey,
  }
  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/product/category/get_category_list`,
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

module.exports = getCategoryList
