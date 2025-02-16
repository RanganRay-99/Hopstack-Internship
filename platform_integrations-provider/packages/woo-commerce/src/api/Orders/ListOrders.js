const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default
const ListOrders = async ({
  context,
  page,
  per_page,
  search,
  after,
  before,
  exclude,
  include,
  offset,
  order,
  orderby,
  parent,
  parent_exlcude,
  status,
  customer,
  product,
  dp,
  shopUrl,
  consumerKey,
  consumerSecret,
}) => {
  try {
    const WooCommerce = new WooCommerceRestApi({
      url: shopUrl,
      consumerKey,
      consumerSecret,
      version: 'wc/v3',
    })
    const response = await WooCommerce.get('orders', {
      context,
      page,
      per_page,
      search,
      after,
      before,
      exclude,
      include,
      offset,
      order,
      orderby,
      parent,
      parent_exlcude,
      status,
      customer,
      product,
      dp,
    })
    const linkHeader = response.headers.link
    const links = linkHeader.split(',')
    const linksToSend = []
    for (const link of links) {
      const [url, type] = link.split(';')
      const typeKey = type.split('rel=')[1].replaceAll('"', '')
      linksToSend.push({
        type: typeKey,
        link: url.replaceAll('<', '').replaceAll('>', ''),
      })
    }
    return {
      orders: response.data,
      links: linksToSend,
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = ListOrders
