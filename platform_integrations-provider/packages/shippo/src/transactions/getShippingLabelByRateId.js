const config = require('../config/config')
const axios = require('axios').default
const { shippo } = config
const processErrors = require('../utils/processError')

let SHIPPO_TOKEN = shippo.apiToken
let SHIPPO_BASEURL = shippo.baseUrl

const getShippingLabelByRateId = async (params) => {
  const { shippoToken, shippoBaseUrl, rateId } = params

  SHIPPO_TOKEN = shippoToken || SHIPPO_TOKEN
  SHIPPO_BASEURL = shippoBaseUrl || SHIPPO_BASEURL
  const data = {
    rate: rateId,
    labelFileType: 'PDF',
    async: false,
  }
  const axiosConfig = {
    method: 'POST',
    url: `${SHIPPO_BASEURL}/transactions`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ShippoToken ${SHIPPO_TOKEN}`,
    },
    data,
  }
  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return {
      errors: processErrors(err),
    }
  }
}

module.exports = getShippingLabelByRateId
