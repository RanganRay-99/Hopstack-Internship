const { getToken } = require('@/index')

const axios = require('axios').default



const getCustomerServiceMetricTask = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, task_id } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
    url: `https://api.ebay.com/sell/feed/v1/customer_service_metric_task/${task_id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      query: {
        task_id,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getCustomerServiceMetricTask