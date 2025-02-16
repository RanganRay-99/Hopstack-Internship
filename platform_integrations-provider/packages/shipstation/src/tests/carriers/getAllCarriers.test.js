const { getAllCarriers } = require('../../../src')
const config = require('../../config/config')
const shipstation = config.shipstation
const testFunction = async () => {
  const params = {
    apiKey: shipstation.apiKey,
    apiSecret: shipstation.apiSecret
  }
  const data = await getAllCarriers(params)
  console.log(data)
}

testFunction()

// [
//   {
//     name: 'Stamps.com',
//     code: 'stamps_com',
//     accountNumber: 'svaleev-8901bo',
//     requiresFundedAccount: true,
//     balance: 81.03,
//     nickname: 'TOS PREP SHIPSTATION',
//     shippingProviderId: 49271,
//     primary: true
//   },
//   {
//     name: 'UPS',
//     code: 'ups',
//     accountNumber: '7EX663',
//     requiresFundedAccount: false,
//     balance: 0,
//     nickname: 'TOSPREP',
//     shippingProviderId: 49965,
//     primary: true
//   },
//   {
//     name: 'DHL Express from ShipStation',
//     code: 'dhl_express_worldwide',
//     accountNumber: null,
//     requiresFundedAccount: true,
//     balance: 81.03,
//     nickname: 'TOS PREP SHIPSTATION',
//     shippingProviderId: 90554,
//     primary: true
//   },
//   {
//     name: 'UPS by ShipStation',
//     code: 'ups_walleted',
//     accountNumber: 'W45758',
//     requiresFundedAccount: true,
//     balance: 81.03,
//     nickname: 'TOS PREP SHIPSTATION',
//     shippingProviderId: 49282,
//     primary: true
//   }
// ]

