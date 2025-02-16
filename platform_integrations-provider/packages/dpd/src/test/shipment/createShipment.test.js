const  { createShipment }  = require('../../../src')
const testFunction = async () => {
  const params = {
    "collectionDate": "2023-03-24T05:00:00",
    "networkCode": "1^12",
    "numberOfParcels": 1,
    "totalWeight": 5,
    "deliveryAddress": {
      "organisation": "DPD Group Ltd",
      "countryCode": "GB",
      "postcode":  "B66 1BY",
      "street": "Roebuck Lane",
      "locality": "Smethwick",
      "town":  "Birmingham",
      "county": "West Midlands"
    },
    "deliveryContact": {
      "name":"My Contact",
      "telephone": "01215002500"
    },
    "deliveryNotification": {
      "email": null,
      "mobile": "01921000001"
    },
    "collectionAddress": {
      "organisation": "WE Prep F B A",
      "countryCode": "GB",
      "postcode":  "IP39RU",
      "street": "UNIT 5 BERMUDA ROAD",
      "locality": "Smethwick",
      "town":  "IPSWICH",
      "county": ""
    },
    "collectionContact": {
      "name":"My Contact",
      "telephone": "01215002500"
    },
    "deliveryInstructions": "TESTING HOPSTACK",
    "shippingRef1": "Testing Hopstack"
  }
  const data = await createShipment(params)
  console.log(data)
}

testFunction()