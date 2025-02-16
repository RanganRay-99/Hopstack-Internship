const getToken = require('../../auth/getToken')
const axios = require('axios').default

const createInventoryTask = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, feedType, schemaVersion, listingFormat } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const data = {
      schemaVersion,
      feedType: feedType || 'LMS_ACTIVE_INVENTORY_REPORT',
      filterCriteria: {
        listingFormat, // ENUM: [AUCTION,FIXED_PRICE]
      },
    }

    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/feed/v1/inventory_task`,
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
//     clientId: 'x',
//     clientSecret: 'x',
//     refreshToken: 'x',
//     feedType: 'LMS_ACTIVE_INVENTORY_REPORT',
//     schemaVersion: '1.0',
//   }
//   const data = await createInventoryTask(param)
//   console.log(data)
//   console.log(data?.response?.data)
//   console.log(JSON.stringify(data?.response?.data))
// })()

module.exports = createInventoryTask
