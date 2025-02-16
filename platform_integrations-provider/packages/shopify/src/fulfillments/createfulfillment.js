const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const createFulfilllment = async (params) => {
  try {
    const { apiUrl, orderId, locationId, trackingNumber, trackingUrls, notifyCustomer, lineItems } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {
      fulfillment: {
        location_id: locationId,
        tracking_number: trackingNumber,
        tracking_urls: trackingUrls,
        notify_customer: notifyCustomer,
        line_items: lineItems,
        // [
        //   {
        //     id: 12430631698454,
        //     quantity: 2,
        //   },
        // ],
      },
    }
    const axiosConfig = {
      method: 'POST',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/fulfillments.json`,
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

module.exports = createFulfilllment
