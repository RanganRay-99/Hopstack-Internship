const axios = require('axios').default
const config = require('../config/config')
const login = require('../login/login')
const { dpd } = config

let DPD_BASEURL = dpd.baseUrl
let DPD_USERNAME = dpd.username
let DPD_PASSWORD = dpd.password

const getAllCountry = async (params) => {
  try {
    const { username, password, baseUrl } = params
    DPD_BASEURL = baseUrl || dpd.baseUrl
    DPD_USERNAME = username || dpd.username
    DPD_PASSWORD = password || dpd.password

    const loginParams = {
      username: DPD_USERNAME,
      password: DPD_PASSWORD,
      baseUrl: DPD_BASEURL,
    }
    const geoSessionToken = await login(loginParams)
    const axiosConfig = {
      method: 'GET',
      url: `${DPD_BASEURL}/shipping/country`,
      headers: {
        GeoClient: 'thirdparty/Hopstack',
        GeoSession: `${geoSessionToken}`,
        'Content-Type': 'application/json',
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = getAllCountry
