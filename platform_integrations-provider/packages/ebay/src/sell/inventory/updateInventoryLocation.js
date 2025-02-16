const { getToken } = require('@/index')

const axios = require('axios').default


const updateInventoryLocation = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, locationAdditionalInformation, locationInstructions, locationWebUrl, phone,date } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data ={
        locationAdditionalInformation,
        locationInstructions,
        locationWebUrl,
        name,
        operatingHours: [
          {
            dayOfWeekEnum: [],
            intervals: [
              {
                close:[],
                open:[]
              }
            ]
          }
        ],
        phone,
        specialHours: [
          {
            date,
            intervals: [
              {
                close:'',
                open: ''
              }
            ]
          }
        ]
      } 
        
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/location/${merchantLocationKey}/update_location_details`,
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

module.exports = updateInventoryLocation