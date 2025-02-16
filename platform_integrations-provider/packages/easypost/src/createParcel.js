const axios = require('axios').default
const config = require('./config/config')

let Easypost = config.easypost

const createParcel = async (params) => {
  const { apiKey, length, width, height, weight } = params

  Easypost.apiKey = apiKey || Easypost.apiKey

  const data = {
    parcel: {
      length,
      width,
      height,
      weight,
    },
  }

  const axiosConfig = {
    method: 'POST',
    url: `${Easypost.baseUrl}/v2/parcels`,
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

module.exports = createParcel
