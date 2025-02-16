const axios = require('axios').default
const config = require('./config/config')

let UPS_API_BASEURL = config.UPS_API_BASEURL
let UPS_ACCESS_KEY = config.UPS_ACCESS_KEY
let UPS_ACCOUNT_NUMBER = config.UPS_ACCOUNT_NUMBER
let UPS_PASSWORD = config.UPS_PASSWORD
let UPS_USERID = config.UPS_USERID

const fetchRates = async (params) => {
  const { sender, receiver, weight, width, height, length, apiBaseURL, accessKey, accountNumber, password, userid } = params
  UPS_API_BASEURL = apiBaseURL || UPS_API_BASEURL
  UPS_ACCESS_KEY = accessKey || UPS_ACCESS_KEY
  UPS_ACCOUNT_NUMBER = accountNumber || UPS_ACCOUNT_NUMBER
  UPS_PASSWORD = password || UPS_PASSWORD
  UPS_USERID = userid || UPS_USERID
  const data = {
    RateRequest: {
      Request: {
        SubVersion: '1703',
        TransactionReference: {
          CustomerContext: ' ',
        },
      },
      Shipment: {
        ShipmentRatingOptions: {
          UserLevelDiscountIndicator: 'TRUE',
        },
        Shipper: {
          Name: 'Billy Blanks',
          ShipperNumber: ' ',
          Address: {
            PostalCode: sender.postcode,
            CountryCode: sender.country_code,
          },
        },
        ShipTo: {
          Name: 'Sarita Lynn',
          Address: {
            PostalCode: receiver.postcode,
            CountryCode: receiver.country_code,
          },
        },
        ShipFrom: {
          Name: 'Billy Blanks',
          Address: {
            PostalCode: sender.postcode,
            CountryCode: sender.country_code,
          },
        },
        Service: {
          Code: '03',
          Description: 'Ground',
        },
        ShipmentTotalWeight: {
          UnitOfMeasurement: {
            Code: 'LBS',
            Description: 'Pounds',
          },
          Weight: weight.toString(),
        },
        Package: {
          PackagingType: {
            Code: '02',
            Description: 'Package',
          },
          Dimensions: {
            UnitOfMeasurement: {
              Code: 'IN',
            },
            Length: length.toString(),
            Width: width.toString(),
            Height: height.toString(),
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: 'LBS',
            },
            Weight: weight.toString(),
          },
        },
      },
    },
  }

  const axiosConfig = {
    method: 'post',
    url: `${UPS_API_BASEURL}/ship/v1/rating/Rate`,
    headers: {
      AccessLicenseNumber: UPS_ACCESS_KEY,
      Password: UPS_PASSWORD,
      Username: UPS_USERID,
      transactionSrc: UPS_USERID,
      'Content-Type': 'application/json',
    },
    data,
  }

  try {
    let response = await axios(axiosConfig)
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = fetchRates
