const axios = require('axios').default
const config = require('@/config/config')

let Aramex = config.aramex

const fetchShipmentRates = async (params) => {
  const {
    apiBaseURL,
    username,
    password,
    accountNumber,
    accountPin,
    accountEntity,
    accountCountryCode,
    sender,
    receiver,
    shipment,
  } = params

  Aramex.baseUrl = apiBaseURL || Aramex.baseUrl
  Aramex.username = username || Aramex.username
  Aramex.password = password || Aramex.password
  Aramex.account.number = accountNumber || Aramex.account.number
  Aramex.account.pin = accountPin || Aramex.account.pin
  Aramex.account.entity = accountEntity || Aramex.account.entity
  Aramex.account.countryCode = accountCountryCode || Aramex.account.countryCode

  const data = {
    ClientInfo: {
      UserName: Aramex.username,
      Password: Aramex.password,
      Version: 'v1.0',
      AccountNumber: Aramex.account.number,
      AccountPin: Aramex.account.pin,
      AccountEntity: Aramex.account.entity,
      AccountCountryCode: Aramex.account.countryCode,
    },
    Transaction: null,
    DestinationAddress: {
      Line1: '',
      Line2: '',
      Line3: '',
      City: receiver.city || '',
      StateOrProvinceCode: '',
      PostCode: receiver.postCode,
      CountryCode: receiver.country,
      Longitude: 0,
      Latitude: 0,
      BuildingNumber: null,
      BuildingName: null,
      Floor: null,
      Apartment: null,
      POBox: null,
      Description: '',
    },
    OriginAddress: {
      Line1: '',
      Line2: '',
      Line3: '',
      City: sender.city || '',
      StateOrProvinceCode: '',
      PostCode: sender.postCode,
      Longitude: 0,
      Latitude: 0,
      CountryCode: sender.country,
      BuildingNumber: null,
      BuildingName: null,
      Floor: null,
      Apartment: null,
      POBox: null,
      Description: '',
    },
    ShipmentDetails: {
      ProductGroup: 'EXP',
      ProductType: 'PPX',
      DescriptionOfGoods: '',
      GoodsOriginCountry: '',
      NumberOfPieces: '1',
      PaymentOptions: null,
      PaymentType: 'P',
      Dimensions: {
        Length: parseInt(shipment.length),
        Width: parseInt(shipment.width),
        Height: parseInt(shipment.height),
        Unit: 'CM',
      },
      ChargeableWeight: {
        Value: parseInt(shipment.weight),
        Unit: 'KG',
      },
      DeliveryInstructions: null,
      ActualWeight: {
        Value: parseFloat(shipment.weight),
        Unit: 'KG',
      },
    },
  }

  const axiosConfig = {
    method: 'post',
    url: `${Aramex.baseUrl}/RateCalculator/Service_1_0.svc/json/CalculateRate`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }

  try {
    let response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = fetchShipmentRates
