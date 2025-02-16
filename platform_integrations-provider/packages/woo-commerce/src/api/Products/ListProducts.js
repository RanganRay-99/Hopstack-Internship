const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const ListProducts = async ({
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
  parent_exclude,
  slug,
  status,
  type,
  sku,
  featured,
  category,
  tag,
  shipping_class,
  attribute,
  attribute_term,
  tax_class,
  on_sale,
  min_price,
  max_price,
  stock_status,
  shopUrl,
  consumerKey,
  consumerSecret,
}) => {
  try {
    const api = new WooCommerceRestApi({
      url: shopUrl,
      consumerKey,
      consumerSecret,
      version: 'wc/v3',
    })
    const response = await api.get('products', {
      context,
      page,
      per_page,
      search,
      after,
      modified_after: after,
      before,
      exclude,
      include,
      offset,
      order,
      orderby,
      parent,
      parent_exclude,
      slug,
      status,
      type,
      sku,
      featured,
      category,
      tag,
      shipping_class,
      attribute,
      attribute_term,
      tax_class,
      on_sale,
      min_price,
      max_price,
      stock_status,
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
      products: response.data,
      links: linksToSend,
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = ListProducts
