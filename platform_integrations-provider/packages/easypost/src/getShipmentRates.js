const axios = require('axios').default
const config = require('./config/config')

let Easypost = config.easypost

const getShipmentRates = async (params) => {
  const { apiKey, shipmentId } = params

  Easypost.apiKey = apiKey || Easypost.apiKey

  const axiosConfig = {
    method: 'POST',
    url: `${Easypost.baseUrl}/v2/shipments/${shipmentId}/rerate`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(Easypost.apiKey).toString('base64')}`,
    },
    data: {},
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getShipmentRates
