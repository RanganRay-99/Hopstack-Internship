const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const getProductDetail = async (params) => {
  const { secretKey, itemId } = params

  const body = {
    secretkey: secretKey,
    item_id: itemId,
  }
  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/product/get_product_detail`,
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

module.exports = getProductDetail
