const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const updateOrderTrackingInfo = async (params) => {
  try {
    const { apiUrl, orderId, trackingNumber, trackingUrl, notifyCustomer, trackingCompany } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    let axiosConfig = {
      method: 'GET',
      url: `${SHOPIFY_BASEURL}/orders/${orderId}/fulfillments.json`,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let response = await axios(axiosConfig)
    const fulfillments = response.data?.fulfillments

    const result = []

    for (const fulfillment of fulfillments) {
      const fulfillmentId = fulfillment?.id

      const data = {
        fulfillment: {
          notify_customer: notifyCustomer,
          tracking_info: { number: trackingNumber, url: trackingUrl, company: trackingCompany },
        },
      }

      axiosConfig = {
        method: 'POST',
        url: `${SHOPIFY_BASEURL}/fulfillments/${fulfillmentId}/update_tracking.json`,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      }

      response = await axios(axiosConfig)
      result.push(response.data?.fulfillment)
    }

    return {
      fulfillments: result,
    }
  } catch (err) {
    return err
  }
}

module.exports = updateOrderTrackingInfo
