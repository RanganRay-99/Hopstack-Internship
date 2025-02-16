const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getOrders = async (params) => {
  try {
    const {
      apiUrl,
      attributionAppId,
      createdBefore,
      createdAfter,
      fields,
      financial_status,
      fulfillmentStatus,
      ids,
      limit,
      processedBefore,
      processedAfter,
      sinceId,
      status,
      lastUpdatedBefore,
      lastUpdatedAfter,
    } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'get',
      url: `${SHOPIFY_BASEURL}/orders.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        attribution_app_id: attributionAppId,
        created_at_max: createdBefore,
        created_at_min: createdAfter,
        fields,
        financial_status: financial_status,
        fulfillment_status: fulfillmentStatus,
        ids: ids?.toString(),
        limit,
        processed_at_max: processedBefore,
        processed_at_min: processedAfter,
        since_id: sinceId,
        status,
        updated_at_max: lastUpdatedBefore,
        updated_at_min: lastUpdatedAfter,
      },
    }
    const response = await axios(axiosConfig)
    response.data.headers = {}
    response.data.headers.link = response.headers.link
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getOrders
