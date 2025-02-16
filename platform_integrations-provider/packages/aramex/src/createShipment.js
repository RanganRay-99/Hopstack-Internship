const axios = require('axios').default
const config = require('@/config/config')

let Aramex = config.aramex

const createShipment = async (params) => {
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
    currency,
    codAmount,
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
    Shipments: [
      {
        Shipper: {
          AccountNumber: Aramex.account.number,
          PartyAddress: {
            Line1: sender.address1,
            Line2: sender.address2,
            Line3: '',
            City: sender.city,
            StateOrProvinceCode: sender.state,
            PostCode: sender.postCode,
            CountryCode: sender.country,
          },
          Contact: {
            Department: ' ',
            PersonName: sender.name,
            Title: ' ',
            CompanyName: ' ',
            PhoneNumber1: sender.phone,
            PhoneNumber1Ext: '',
            PhoneNumber2: '',
            PhoneNumber2Ext: '',
            FaxNumber: '',
            CellPhone: sender.phone,
            EmailAddress: sender.email,
            Type: '',
          },
        },
        Consignee: {
          Reference1: '',
          Reference2: '',
          AccountNumber: '',
          PartyAddress: {
            Line1: receiver.address1,
            Line2: receiver.address2,
            Line3: ' ',
            City: receiver.city,
            StateOrProvinceCode: receiver.state,
            PostCode: receiver.postCode,
            CountryCode: receiver.country,
          },
          Contact: {
            Department: ' ',
            PersonName: receiver.name,
            Title: ' ',
            CompanyName: '-',
            PhoneNumber1: receiver.phone,
            PhoneNumber1Ext: '',
            PhoneNumber2: '',
            PhoneNumber2Ext: '',
            FaxNumber: '',
            CellPhone: receiver.phone,
            EmailAddress: receiver.email,
            Type: '',
          },
        },
        ShippingDateTime: `\/Date(${new Date().getTime() + 86400000})\/`,
        Details: {
          Dimensions: {
            Length: shipment.length,
            Width: shipment.width,
            Height: shipment.height,
            Unit: 'CM',
          },
          ActualWeight: {
            Unit: 'KG',
            Value: shipment.weight,
          },
          ChargeableWeight: {
            Unit: 'KG',
            Value: shipment.weight,
          },
          DescriptionOfGoods: ' ',
          GoodsOriginCountry: '',
          NumberOfPieces: '1',
          ProductGroup: 'EXP',
          ProductType: 'PPX',
          PaymentType: 'P',
          PaymentOptions: 'CASH',
          CustomsValueAmount: {
            CurrencyCode: currency || 'USD',
            Value: codAmount,
          },
          Items: {
            ShipmentItem: {
              PackageType: '',
              Quantity: '1',
              Weight: {
                Unit: 'KG',
                Value: shipment.weight,
              },
              Comments: '',
              Reference: '',
            },
          },
        },
      },
    ],
  }

  const axiosConfig = {
    method: 'post',
    url: `${Aramex.baseUrl}/Shipping/Service_1_0.svc/json/CreateShipments`,
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

module.exports = createShipment
