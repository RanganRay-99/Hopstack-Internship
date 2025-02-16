const getToken  = require('@/auth/getToken')

const axios = require('axios').default


const createInventoryLocation = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, merchantLocationKey, addressLine1, addressLine2, city, county, postalCode, stateOrProvince, latitude,
    longitude, locationAdditionalInformation, locationInstructions, locationWebUrl, name,phone, date } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        location: {
          address: {
            addressLine1,
            addressLine2,
            city,
            country: [],
            county,
            postalCode,
            stateOrProvince
          },
          geoCoordinates: {
            latitude,
            longitude,
          }
        },
        locationAdditionalInformation,
        locationInstructions,
        locationTypes: [
          
        ],
        locationWebUrl,
        merchantLocationStatus:[],
        name,
        operatingHours: [
          {
            dayOfWeekEnum:[],
            intervals: [
              {
                close:'',
                open:''
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
                open:'',
              }
            ]
          }
        ]
      }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/location/${merchantLocationKey}`,
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

module.exports = createInventoryLocation