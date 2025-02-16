const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const updateTrackingInfo = async (params) => {
  try {
    const { apiUrl, fulfillmentId, trackingNumber, trackingUrl, notifyCustomer, trackingComapny } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const data = {
      fulfillment: {
        notify_customer: notifyCustomer,
        tracking_info: {
          number: trackingNumber,
          url: trackingUrl,
          company: trackingComapny,
        },
      },
    }
    const axiosConfig = {
      method: 'POST',
      url: `${SHOPIFY_BASEURL}/fulfillments/${fulfillmentId}/update_tracking.json`,
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

module.exports = updateTrackingInfo
