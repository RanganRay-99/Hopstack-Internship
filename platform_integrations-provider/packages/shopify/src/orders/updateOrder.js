const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const updateOrder = async (params) => {
  try {
    const { apiUrl, orderId, note, buyer_accepts_marketing, email, phone, tags, metafields, shipping_address_attributes } =
      params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {
      order: {
        id: orderId,
        note,
        buyer_accepts_marketing,
        email,
        phone,
        tags,
        metafields,
        shipping_address_attributes,
      },
    }
    const axiosConfig = {
      method: 'put',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateOrder
