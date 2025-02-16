const { getToken } = require('@/index')

const axios = require('axios').default



const getOrderTasks = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, feed_type,schedule_id, look_back_days, date_range, limit, offset } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/order_task`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        feed_type,
        schedule_id,
        look_back_days,
        date_range,
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

module.exports = getOrderTasks