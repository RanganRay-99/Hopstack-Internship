const axios = require('axios').default
const config = require('@/config/config')
const getToken = require('../config/auth')

let FEDEX_ACCOUNT_NUMBER = config.FEDEX_ACCOUNT_NUMBER
let FEDEX_API_BASEURL = config.FEDEX_API_BASEURL

const ratesAndTransit = async (params) => {
  try {
    const { clientId, secretKey, sender, receiver, shipment, accountNumber, apiBaseURL } = params
    const token = getToken(apiBaseURL, clientId, secretKey)
    FEDEX_ACCOUNT_NUMBER = accountNumber || FEDEX_ACCOUNT_NUMBER
    FEDEX_API_BASEURL = apiBaseURL || FEDEX_API_BASEURL
    const data = {
      accountNumber: {
        value: FEDEX_ACCOUNT_NUMBER,
      },
      requestedShipment: {
        shipper: {
          address: {
            // streetLines: ["1202  Chalet Ln"],
            // city: "Harrison",
            // stateOrProvinceCode: "AR",
            postalCode: sender.postalCode,
            countryCode: sender.countryCode,
            // residential: false,
          },
        },
        recipient: {
          address: {
            // streetLines: ["1202 Chalet Ln"],
            // city: "Harrison",
            // stateOrProvinceCode: "AR",
            postalCode: receiver.postalCode,
            countryCode: receiver.countryCode,
            // residential: false,
          },
        },
        preferredCurrency: 'USD',
        rateRequestType: ['ACCOUNT', 'LIST'],
        pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
        requestedPackageLineItems: [
          {
            weight: {
              units: 'KG',
              value: shipment.weight,
            },
            // dimensions: {
            //   length: 10,
            //   width: 8,
            //   height: 2,
            //   units: "IN",
            // },
          },
        ],
        packagingType: 'YOUR_PACKAGING',
      },
    }

    const config = {
      method: 'post',
      url: `${FEDEX_API_BASEURL}/rate/v1/rates/quotes`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    }

    const response = await axios(config)
    return response.data.output.rateReplyDetails
  } catch (err) {
    return err
    // res.status(err.response.status).send(err.response.data)
  }
}

module.exports = ratesAndTransit
