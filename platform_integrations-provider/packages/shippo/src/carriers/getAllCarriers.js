const config = require('../config/config')
const axios = require('axios').default
const { shippo } = config

let SHIPPO_TOKEN = shippo.apiToken
let SHIPPO_BASEURL = shippo.baseUrl

const getAllCarriers = async (params) => {
  const { shippoToken, shippoBaseUrl } = params

  SHIPPO_TOKEN = shippoToken || SHIPPO_TOKEN
  SHIPPO_BASEURL = shippoBaseUrl || SHIPPO_BASEURL

  const resultData = []
  let pageNo = 1
  let flag = true
  try {
    while (flag) {
      const axiosConfig = {
        method: 'GET',
        url: `${SHIPPO_BASEURL}/carrier_accounts`,
        headers: {
          Authorization: `ShippoToken ${SHIPPO_TOKEN}`,
        },
        params: {
          service_levels: true,
          page: pageNo,
        },
      }
      const response = await axios(axiosConfig)
      if (response.data.results && response.data.next) {
        const results = response.data.results
        for (let result of results) {
          resultData.push(result)
        }
        pageNo = pageNo + 1
      } else {
        flag = false
      }
    }

    return resultData
  } catch (err) {
    return err
  }
}

module.exports = getAllCarriers
