const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const updateProduct = async (params) => {
  try {
    const { apiUrl, productId, title, status, tags, images, variants } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    // doc -> https://shopify.dev/api/admin-rest/2021-07/resources/product#put-products-product-id
    const data = {
      product: {
        id: productId,
        title: title,
        status, // active || archived || draft
        tags,
        images,
        variants,
      },
    }
    const axiosConfig = {
      method: 'put',
      url: `${SHOPIFY_BASEURL}/products/${productId}.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateProduct
