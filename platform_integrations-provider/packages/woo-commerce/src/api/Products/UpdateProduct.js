const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const UpdateProduct = async ({ id, product, shopUrl, consumerKey, consumerSecret }) => {
  try {
    const WooCommerce = new WooCommerceRestApi({
      url: shopUrl,
      consumerKey,
      consumerSecret,
      version: 'wc/v3',
    })
    const response = await WooCommerce.put(`products/${id}`, product)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = UpdateProduct
