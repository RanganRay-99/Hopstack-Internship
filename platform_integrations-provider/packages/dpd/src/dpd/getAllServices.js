const axios = require('axios').default
const config = require('../config/config')
const login = require('../login/login')
const { dpd } = config

let DPD_BASEURL = dpd.baseUrl
let DPD_USERNAME = dpd.username
let DPD_PASSWORD = dpd.password

const getAllServices = async (params) => {
  try {
    const { username, password, baseUrl, deliveryPostcode, collectionPostcode, deliveryCountryCode, collectionCountryCode } =
      params
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
      url: `${DPD_BASEURL}/shipping/network/`,
      headers: {
        GeoClient: 'thirdparty/Hopstack',
        GeoSession: `${geoSessionToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        'deliveryDetails.address.countryCode': deliveryCountryCode,
        'deliveryDetails.address.postcode': deliveryPostcode,
        'collectionDetails.address.countryCode': collectionCountryCode,
        'collectionDetails.address.postcode': collectionPostcode,
      },
    }
    const response = await axios(axiosConfig)
    return response.data.data
  } catch (err) {
    return err
  }
}

module.exports = getAllServices
