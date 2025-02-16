const { getToken } = require('@/index')

const axios = require('axios').default



const getInputFile = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, task_id } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/task/${task_id}/download_input_file`,
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

module.exports = getInputFile