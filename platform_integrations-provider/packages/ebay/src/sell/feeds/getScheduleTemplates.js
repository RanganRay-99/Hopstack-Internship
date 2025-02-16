const { getToken } = require('@/index')

const axios = require('axios').default



const getScheduleTemplates = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, feed_type, limit, offset } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/schedule_template`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        feed_type,
        limit,
        offset,
        
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getScheduleTemplates