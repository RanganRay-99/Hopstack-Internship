const getToken = require('../../auth/getToken')
const axios = require('axios').default

const createOrderTask = async (params) => {
  try {
    const {
      clientId,
      clientSecret,
      refreshToken,
      feedType,
      schemaVersion,
      createdFrom,
      createdTo,
      modifiedFrom,
      modifiedTo,
      orderStatus,
    } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const data = {
      feedType,
      filterCriteria: {
        creationDateRange: {
          from: createdFrom, // format: UTC: yyyy-MM-ddThh:mm:ss.SSSZ
          to: createdTo,
        },
        modifiedDateRange: {
          from: modifiedFrom,
          to: modifiedTo,
        },
        orderStatus, // ENUM:  [ACTIVE,COMPLETED]
      },
      schemaVersion,
    }

    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/feed/v1/order_task`,
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

module.exports = createOrderTask
