const getToken = require('../../auth/getToken')
const axios = require('axios').default

const getTask = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, taskId } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/task/${taskId}`,
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
//     clientId: 'H7805e',
//     clientSecret: 'Pda4',
//     refreshToken: 'vTV=',
//     taskId: 'task-20-6044429713411',
//   }
//   var data = await getTask(param)
//   console.log(data)
// })()

module.exports = getTask
