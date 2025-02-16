const getToken = require('../../auth/getToken')
const axios = require('axios').default

const createCustomerServiceMetricTask = async (params) => {
  try {
    const {
      clientId,
      clientSecret,
      refreshToken,
      feedType,
      schemaVersion,
      customerServiceMetricType,
      evaluationMarketplaceId,
      listingCategories,
    } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const data = {
      feedType: feedType || 'CUSTOMER_SERVICE_METRICS_REPORT',
      filterCriteria: {
        customerServiceMetricType: customerServiceMetricType || 'ITEM_NOT_RECEIVED', // ENUM: [ITEM_NOT_AS_DESCRIBED,ITEM_NOT_RECEIVED]
        evaluationMarketplaceId: evaluationMarketplaceId || 'EBAY_US', // ENUM:   [EBAY_AT,EBAY_AU,EBAY_BE...]
        listingCategories,
        shippingRegions: ['DOMESTIC', 'INTERNATIONAL_MATURED_REGION', 'INTERNATIONAL_EMERGING_REGION'], // ENUM:  [DOMESTIC,INTERNATIONAL_MATURED_REGION,INTERNATIONAL_EMERGING_REGION]
      },
      schemaVersion,
    }

    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/feed/v1/customer_service_metric_task`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        'Accept-Language': 'en-US',
      },
      data,
    }

    const response = await axios(axiosConfig)
    const taskId = response.headers.location.substring(1 + response.headers.location.lastIndexOf('/'))
    return { taskId }
  } catch (err) {
    return err
  }
}

module.exports = createCustomerServiceMetricTask
