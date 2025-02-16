const config = require('../src/config/config')
const { createShipment } = require('../src')

let UPS_API_BASEURL = config.UPS_API_BASEURL
let UPS_ACCESS_KEY = config.UPS_ACCESS_KEY
let UPS_ACCOUNT_NUMBER = config.UPS_ACCOUNT_NUMBER
let UPS_PASSWORD = config.UPS_PASSWORD
let UPS_USERID = config.UPS_USERID

const testFunction = async () => {
  const params = {
    shipment: {
      shipmentID: 'adfasddf989df0',
      description: 'sample description',
      serviceCode: '01',
    },
    items: [
      {
        description: 'sample description 1',
        weightUOM: 'LBS',
        weight: '1',
        length: '1',
        width: '2',
        height: '3',
      },
      {
        description: 'sample description 2',
        weightUOM: 'LBS',
        weight: '2',
        length: '4',
        width: '5',
        height: '6',
      },
      {
        description: 'sample description 3',
        weightUOM: 'LBS',
        weight: '3',
        length: '7',
        width: '8',
        height: '9',
      },
    ],
    sender: {
      name: 'Sender A',
      TaxIdentificationNumber: 'adsffasd',
      phone: '1234567890',
      address1: '5a, asdf',
      city: 'New York',
      state: 'NY',
      postcode: '10004',
      country: 'US',
    },
    receiver: {
      name: 'Receiver A',
      TaxIdentificationNumber: 'adsffasd',
      phone: '1234567890',
      address1: '5a, asdf',
      city: 'New York',
      state: 'NY',
      postcode: '10004',
      country: 'US',
    },
    apiBaseURL: UPS_API_BASEURL,
    accessKey: UPS_ACCESS_KEY,
    accountNumber: UPS_ACCOUNT_NUMBER,
    password: UPS_PASSWORD,
    userid: UPS_USERID,
  }

  try {
    let response = await createShipment(params)
    console.log(JSON.stringify(response))
  } catch (err) {
    console.log(err)
  }
}

testFunction()
