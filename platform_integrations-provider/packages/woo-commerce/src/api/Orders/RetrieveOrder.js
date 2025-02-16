const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const RetrieveOrder = async ({ id, shopUrl, consumerKey, consumerSecret }) => {
  try {
    const WooCommerce = new WooCommerceRestApi({
      url: shopUrl,
      consumerKey,
      consumerSecret,
      version: 'wc/v3',
    })
    const response = await WooCommerce.get(`orders/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = RetrieveOrder
