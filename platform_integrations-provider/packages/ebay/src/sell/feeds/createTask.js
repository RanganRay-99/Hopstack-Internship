const getToken = require('../../auth/getToken')
const axios = require('axios').default

const createTask = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, feedType, schemaVersion } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const data = {
      feedType, // available: Inventory upload feed types, Fulfillment upload feed types, Seller Hub feed types
      schemaVersion,
    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/feed/v1/task`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
      },
      data,
    }
    const response = await axios(axiosConfig)
    const taskId = response.headers.location.substring(1 + response.headers.location.lastIndexOf('/'))
    return { taskId }
  } catch (err) {
    return err
  }
}

// ;(async () => {
//   const param = {
//     clientId: 'H',
//     clientSecret: 'PRD4',
//     refreshToken: 'v',
//     feedType: 'LMS_ACTIVE_INVENTORY_REPORT',
//     schemaVersion: '1.0',
//   }
//   const data = await createTask(param)
//   console.log(data)
//   console.log(data?.response?.data)
//   console.log(JSON.stringify(data?.response?.data))
// })()

module.exports = createTask
