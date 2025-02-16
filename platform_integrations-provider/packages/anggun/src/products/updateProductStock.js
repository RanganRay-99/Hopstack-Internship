const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const updateProductStock = async (params) => {
  const { secretKey, itemId, stock } = params

  const body = {
    secretkey: secretKey,
    item_id: itemId,
    stock,
  }
  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/product/update_product_stock`,
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

module.exports = updateProductStock
