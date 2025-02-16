const getToken = require('../../auth/getToken')
const axios = require('axios').default

const getInventoryTask = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, taskId } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/inventory_task/${taskId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

// ;(async () => {
//   var param = {
//     clientId: 'H',
//     clientSecret: '',
//     refreshToken: 'v',
//     taskId: 'task-20-6067066830850',
//   }
//   var data = await getInventoryTask(param)
//   console.log(data)
//   console.log(data?.response?.data)
//   console.log(JSON.stringify(data?.response?.data))
// })()

module.exports = getInventoryTask
