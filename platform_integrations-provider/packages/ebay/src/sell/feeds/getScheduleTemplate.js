const { getToken } = require('@/index')

const axios = require('axios').default



const getScheduleTemplate = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, schedule_template_id } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/schedule_template/${schedule_template_id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        schedule_template_id
        
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getScheduleTemplate