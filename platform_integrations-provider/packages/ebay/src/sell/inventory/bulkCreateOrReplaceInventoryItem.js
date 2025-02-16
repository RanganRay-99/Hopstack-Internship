const { getToken } = require('@/index')

const axios = require('axios').default



const bulkCreateOrReplaceInventoryItem = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, value, merchantLocationKey, quantity,conditionDescription } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        requests:[{
            availability:{
                pickupAtLocationAvailability:[{
                    availabilityType:[],
                    fulfillmentTime:{
                        unit:[],
                        value,
                    },
                    merchantLocationKey,
                    quantity,
                }],
                shipToLocationAvailability:{
                    availabilityDistributions:[{
                        fulfillmentTime:{
                            unit:[],
                            value,
                        },
                        quantity,
                    }],
                }    
            },
            condition:[],
            conditionDescription,
            locale:[],

        }]

    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/bulk_create_or_replace_inventory_item`,
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

module.exports = bulkCreateOrReplaceInventoryItem