const { CreateOrder } = require('../../src')

const testFunction = async () => {
  const params = {
    data: {
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      set_paid: true,
      billing: {
        first_name: 'Hopstack',
        last_name: 'Dev',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
        email: 'john.doe@example.com',
        phone: '(555) 555-5555',
      },
      shipping: {
        first_name: 'Hopstack',
        last_name: 'Dev',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
      },
      line_items: [
        {
          product_id: 59396,
          quantity: 2,
        },
      ],
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '10.00',
        },
      ],
    },
  }
  const res = await CreateOrder(params)
  console.log(JSON.stringify(res))
}

testFunction()

// Result

const result = {
  id: 59397,
  parent_id: 0,
  status: 'processing',
  currency: 'MYR',
  version: '4.9.0',
  prices_include_tax: false,
  date_created: '2022-09-15T13:44:21',
  date_modified: '2022-09-15T13:44:22',
  discount_total: '0.00',
  discount_tax: '0.00',
  shipping_total: '10.00',
  shipping_tax: '0.00',
  cart_tax: '0.00',
  total: '59.08',
  total_tax: '0.00',
  customer_id: 0,
  order_key: 'wc_order_Fcx4Ev8aeuCuI',
  billing: {
    first_name: 'Hopstack',
    last_name: 'Dev',
    company: '',
    address_1: '969 Market',
    address_2: '',
    city: 'San Francisco',
    state: 'CA',
    postcode: '94103',
    country: 'US',
    email: 'john.doe@example.com',
    phone: '(555) 555-5555',
  },
  shipping: {
    first_name: 'Hopstack',
    last_name: 'Dev',
    company: '',
    address_1: '969 Market',
    address_2: '',
    city: 'San Francisco',
    state: 'CA',
    postcode: '94103',
    country: 'US',
  },
  payment_method: 'bacs',
  payment_method_title: 'Direct Bank Transfer',
  transaction_id: '',
  customer_ip_address: '',
  customer_user_agent: '',
  created_via: 'rest-api',
  customer_note: '',
  date_completed: null,
  date_paid: '2022-09-15T13:44:22',
  cart_hash: '',
  number: '59397',
  meta_data: [
    { id: 1769385, key: 'wcb2bsa_sales_agent', value: '0' },
    { id: 1769386, key: 'wcb2bsa_order_item_types_eligible_for_commission', value: { line_item: '1' } },
    { id: 1769387, key: 'wcb2bsa_created_by', value: 'customer' },
  ],
  line_items: [
    {
      id: 94259,
      name: 'Test-Product',
      product_id: 59396,
      variation_id: 0,
      quantity: 2,
      tax_class: '',
      subtotal: '49.08',
      subtotal_tax: '0.00',
      total: '49.08',
      total_tax: '0.00',
      taxes: [],
      meta_data: [
        { id: 852084, key: 'wcb2bsa_item_commission', value: '', display_key: 'wcb2bsa_item_commission', display_value: '' },
      ],
      sku: '',
      price: 24.54,
      parent_name: null,
    },
  ],
  tax_lines: [],
  shipping_lines: [
    {
      id: 94260,
      method_title: 'Flat Rate',
      method_id: 'flat_rate',
      instance_id: '',
      total: '10.00',
      total_tax: '0.00',
      taxes: [],
      meta_data: [
        { id: 852090, key: 'wcb2bsa_item_commission', value: '', display_key: 'wcb2bsa_item_commission', display_value: '' },
      ],
    },
  ],
  fee_lines: [],
  coupon_lines: [],
  refunds: [],
  date_created_gmt: '2022-09-15T05:44:21',
  date_modified_gmt: '2022-09-15T05:44:22',
  date_completed_gmt: null,
  date_paid_gmt: '2022-09-15T05:44:22',
  currency_symbol: 'RM',
  wcb2bsa_sales_agent: 0,
  wcb2bsa_order_item_types_eligible_for_commission: { line_item: '1' },
  wcb2bsa_created_by: 'customer',
  _links: {
    self: [{ href: 'https://desamurnibatik.my/wp-json/wc/v3/orders/59397' }],
    collection: [{ href: 'https://desamurnibatik.my/wp-json/wc/v3/orders' }],
  },
}
