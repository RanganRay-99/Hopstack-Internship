const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const UpdateOrder = async ({ id, order, shopUrl, consumerKey, consumerSecret }) => {
  try {
    const WooCommerce = new WooCommerceRestApi({
      url: shopUrl,
      consumerKey,
      consumerSecret,
      version: 'wc/v3',
    })
    const response = await WooCommerce.put(`orders/${id}`, order)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = UpdateOrder
