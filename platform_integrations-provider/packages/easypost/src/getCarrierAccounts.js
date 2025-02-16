const axios = require('axios').default
const config = require('./config/config')

let Easypost = config.easypost

const getCarrierAccounts = async (params) => {
  const { apiKey } = params

  Easypost.apiKey = apiKey || Easypost.apiKey

  const axiosConfig = {
    method: 'GET',
    url: `${Easypost.baseUrl}/v2/carrier_accounts`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(Easypost.apiKey).toString('base64')}`,
    },
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getCarrierAccounts
