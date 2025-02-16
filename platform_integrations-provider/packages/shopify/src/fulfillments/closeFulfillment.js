const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const closeFulfillment = async (params) => {
  try {
    const { apiUrl, orderId, trackingNumber, trackingUrl, notifyCustomer, trackingCompany } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    let axiosConfig = {
      method: 'GET',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/fulfillment_orders.json`,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let response = await axios(axiosConfig)
    const fulfillmentOrders = response.data?.fulfillment_orders
    const data = {
      fulfillment: {
        message: 'The package was shipped.',
        notify_customer: notifyCustomer,
        tracking_info: { number: trackingNumber, url: trackingUrl, company: trackingCompany },
        line_items_by_fulfillment_order: fulfillmentOrders
          .filter((order) => order.status !== 'closed')
          .map((order) => ({
            fulfillment_order_id: order.id,
          })),
      },
    }
    axiosConfig = {
      method: 'POST',
      url: `${SHOPIFY_BASEURL}/fulfillments.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }
    response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = closeFulfillment
