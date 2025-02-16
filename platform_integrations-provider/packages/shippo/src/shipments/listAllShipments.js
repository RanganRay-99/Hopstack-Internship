const config = require('../config/config')
const axios = require('axios').default
const { shippo } = config

let SHIPPO_TOKEN = shippo.apiToken
let SHIPPO_BASEURL = shippo.baseUrl

const listAllShipments = async (params) => {
  const { shippoToken, shippoBaseUrl } = params
  SHIPPO_TOKEN = shippoToken || SHIPPO_TOKEN
  SHIPPO_BASEURL = shippoBaseUrl || SHIPPO_BASEURL
  const axiosConfig = {
    method: 'GET',
    url: `${SHIPPO_BASEURL}/shipments`,
    headers: {
      Authorization: `ShippoToken ${SHIPPO_TOKEN}`,
    },
  }
  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = listAllShipments
