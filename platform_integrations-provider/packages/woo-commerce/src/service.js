const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
const { shopUrl, consumerKey, consumerSecret } = require('./config').wooCommerce;

const api = new WooCommerceRestApi({
  url: shopUrl,
  consumerKey,
  consumerSecret,
  version: 'wc/v3',
})

module.exports = api;
