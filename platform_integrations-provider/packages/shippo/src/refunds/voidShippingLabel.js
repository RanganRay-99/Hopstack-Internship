const axios = require('axios').default
const processErrors = require('../utils/processError')

const voidShippingLabel = async ({ shippoToken, shippoBaseUrl, transactionId }) => {
  const data = {
    transaction: transactionId,
  }
  const axiosConfig = {
    method: 'POST',
    url: `${shippoBaseUrl}/refunds`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ShippoToken ${shippoToken}`,
    },
    data,
  }
  try {
    const response = await axios(axiosConfig)
    return {
      object_created: response.data.object_created,
      object_updated: response.data.object_updated,
      object_id: response.data.object_id,
      object_owner: response.data.object_owner,
      status: response.data.status,
      transaction: response.data.transaction,
      test: response.data.test,
    }
  } catch (err) {
    return {
      errors: processErrors(err),
    }
  }
}

module.exports = voidShippingLabel
