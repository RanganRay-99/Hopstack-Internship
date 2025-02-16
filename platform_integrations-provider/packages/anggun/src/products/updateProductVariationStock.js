const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const updateProductVariationStock = async (params) => {
  const { secretKey, itemId, variationId, stock, stock_action } = params
  const body = {
    secretkey: secretKey,
    item_id: itemId,
    variation_id: variationId,
    stock,
    stock_action
  }
  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/product/update_product_variation_stock`,
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

module.exports = updateProductVariationStock
