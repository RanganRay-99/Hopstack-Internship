const axios = require('axios').default
const config = require('./config/config')

let Easypost = config.easypost

const saveAddress = async (params) => {
  const { apiKey, company, street1, street2, city, state, zip, phone } = params

  Easypost.apiKey = apiKey || Easypost.apiKey

  const data = {
    address: {
      company,
      street1,
      street2,
      city,
      state,
      zip,
      phone,
    },
  }

  const axiosConfig = {
    method: 'POST',
    url: `${Easypost.baseUrl}/v2/addresses`,
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

module.exports = saveAddress
