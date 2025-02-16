const axios = require('axios').default
const config = require('@/config/config')

let SHOPIFY_BASEURL = config.SHOPIFY_BASEURL

const getProducts = async (params) => {
  try {
    const {
      apiUrl,
      collectionId,
      createdBefore,
      createdAfter,
      fields,
      handle,
      ids,
      limit,
      presentmentCurrencies,
      productType,
      processedBefore,
      processedAfter,
      publishedStatus,
      sinceId,
      status,
      title,
      lastUpdatedBefore,
      lastUpdatedAfter,
      vendor,
    } = params
    SHOPIFY_BASEURL = apiUrl || SHOPIFY_BASEURL
    const axiosConfig = {
      method: 'get',
      url: `${SHOPIFY_BASEURL}/products.json`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        collection_id: collectionId,
        created_at_max: createdBefore,
        created_at_min: createdAfter,
        fields,
        handle,
        ids: ids?.toString(),
        limit,
        presentment_currencies: presentmentCurrencies,
        product_type: productType,
        processed_at_max: processedBefore,
        processed_at_min: processedAfter,
        published_status: publishedStatus,
        since_id: sinceId,
        status,
        title,
        updated_at_max: lastUpdatedBefore,
        updated_at_min: lastUpdatedAfter,
        vendor,
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

module.exports = getProducts
