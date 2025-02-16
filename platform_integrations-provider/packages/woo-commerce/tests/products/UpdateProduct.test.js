const { UpdateProduct } = require('../../src')

const testFunction = async () => {
  const params = {
    id: 59396,
    data: { name: 'Test-Product' },
  }
  const res = await UpdateProduct(params)
  console.log(JSON.stringify(res))
}

testFunction()

// Result

const result = {
  id: 59396,
  name: 'Test-Product',
  slug: 'product',
  permalink: 'https://desamurnibatik.my/product/product/',
  date_created: '2022-09-15T13:29:22',
  date_created_gmt: '2022-09-15T05:29:22',
  date_modified: '2022-09-15T13:36:02',
  date_modified_gmt: '2022-09-15T05:36:02',
  type: 'simple',
  status: 'publish',
  featured: false,
  catalog_visibility: 'visible',
  description: '',
  short_description: '',
  sku: '',
  price: '24.54',
  regular_price: '24.54',
  sale_price: '',
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  on_sale: false,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  downloadable: false,
  downloads: [],
  download_limit: -1,
  download_expiry: -1,
  external_url: '',
  button_text: '',
  tax_status: 'taxable',
  tax_class: '',
  manage_stock: false,
  stock_quantity: null,
  backorders: 'no',
  backorders_allowed: false,
  backordered: false,
  sold_individually: false,
  weight: '',
  dimensions: { length: '', width: '', height: '' },
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: '',
  shipping_class_id: 0,
  reviews_allowed: true,
  average_rating: '0',
  rating_count: 0,
  upsell_ids: [],
  cross_sell_ids: [],
  parent_id: 0,
  purchase_note: '',
  categories: [{ id: 15, name: 'Uncategorized', slug: 'uncategorized' }],
  tags: [],
  images: [],
  attributes: [],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  price_html:
    '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#82;&#77;</span>24.54</bdi></span>',
  related_ids: [],
  meta_data: [],
  stock_status: 'instock',
  wcb2bsa_commissions: [],
  _links: {
    self: [{ href: 'https://desamurnibatik.my/wp-json/wc/v3/products/59396' }],
    collection: [{ href: 'https://desamurnibatik.my/wp-json/wc/v3/products' }],
  },
}
