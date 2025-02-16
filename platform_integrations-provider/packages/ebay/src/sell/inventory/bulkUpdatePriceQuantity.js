const { getToken } = require('@/index')

const axios = require('axios').default



const bulkUpdatePriceQuantity = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, sku, availableQuantity, offerId, currency, value,merchantLocationKey, quantity} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        
            requests: [
              {
                offers: [
                  {
                    availableQuantity,
                    offerId,
                    price: {
                      currency,
                      value,
                    }
                  }
                ],
                shipToLocationAvailability: {
                  availabilityDistributions: [
                    {
                      fulfillmentTime: {
                        unit: [],
                        value,
                      },
                      merchantLocationKey,
                      quantity,
                    }
                  ],
                 
                },
                sku,
              }
            ]
          

    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/bulk_update_price_quantity`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = bulkUpdatePriceQuantity