const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const addOrder = async (params) => {
  const { secretKey, sender, receiver, order, items } = params

  const body = {
    secretkey: secretKey,
    buyer_name: receiver.name,
    buyer_phone: receiver.phone,
    buyer_email: receiver.email,

    billing_name: sender.name,
    billing_street_address: sender.streetAddress,
    billing_city: sender.city,
    billing_postcode: sender.zipcode,
    billing_state: sender.state,
    billing_country: sender.country,

    recipient_name: receiver.name,
    recipient_contact: receiver.phone,
    recipient_street_address: receiver.streetAddress,
    recipient_city: receiver.city,
    recipient_postcode: receiver.zipcode,
    recipient_state: receiver.state,
    recipient_country: receiver.country,

    order_status: order.status,
    payment: order.paymentMethod,
    payment_reference: order.paymentReference, // optional
    created_date: order.createDate, // optional
    transaction_date: order.transactionDate, // optional
    updated_date: order.updateDate, // optional
    shipping: order.shippingService, // optional
    tracking_code: order.trackingId, // optional
    shipping_total: order.shippingTotal,
    order_final_total: order.finalTotal,
    comment: order.comment, // optional

    items: items.map((item) => ({
      name: item.name,
      sku: item.sku,
      weight: item.weight,
      quantity_purchased: item.quantity,
      final_total: item.total,
      gift: item.isGift || false,
      skip_match_item: item.skipMatchItem || false,
    })),
  }

  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/order/add_order`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData.toString(),
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = addOrder
