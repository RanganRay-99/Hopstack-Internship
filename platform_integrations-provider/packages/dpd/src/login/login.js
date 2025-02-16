const axios = require('axios').default
const config = require('../config/config')
const { dpd } = config

let DPD_BASEURL = dpd.baseUrl
let DPD_USERNAME = dpd.username
let DPD_PASSWORD = dpd.password

const login = async (params) => {
  try {
    const { username, password, baseUrl } = params
    DPD_BASEURL = baseUrl || dpd.baseUrl
    DPD_USERNAME = username || dpd.username
    DPD_PASSWORD = password || dpd.password

    const axiosConfig = {
      method: 'POST',
      url: `${DPD_BASEURL}/user/?action=login`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${DPD_USERNAME}:${DPD_PASSWORD}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }

    const response = await axios(axiosConfig)
    return response.data.data.geoSession
  } catch (err) {
    return err
  }
}

module.exports = login
