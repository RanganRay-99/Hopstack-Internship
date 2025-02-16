const axios = require('axios').default
const config = require('./config/config')

let Easypost = config.easypost

const generateShippingLabel = async (params) => {
  const { apiKey, shipmentId, rateId } = params

  Easypost.apiKey = apiKey || Easypost.apiKey

  const data = {
    rate: {
      id: rateId,
    },
  }

  const axiosConfig = {
    method: 'POST',
    url: `${Easypost.baseUrl}/v2/shipments/${shipmentId}/buy`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(Easypost.apiKey).toString('base64')}`,
    },
    data,
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = generateShippingLabel
