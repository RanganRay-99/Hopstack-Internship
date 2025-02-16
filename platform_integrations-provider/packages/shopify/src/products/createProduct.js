const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const createProduct = async (params) => {
  try {
    const { apiUrl, title, bodyHTML, vendor, type, tags } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {
      product: {
        title,
        body_html: bodyHTML,
        vendor,
        product_type: type,
        tags,
      },
    }
    const axiosConfig = {
      method: 'post',
      url: `${SHOPIFY_BASEURL}/products.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = createProduct
