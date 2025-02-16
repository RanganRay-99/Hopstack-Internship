const { getCarrierByCarrierCode } = require('../../../src')

const testFunction = async () => {
  const params = {
    carrierCode: 'stamps_com',
  }
  const data = await getCarrierByCarrierCode(params)
  console.log(data)
}

testFunction()

// {
//   name: 'Stamps.com',
//   code: 'stamps_com',
//   accountNumber: 'svaleev-8901bo',
//   requiresFundedAccount: true,
//   balance: 81.03,
//   nickname: 'TOS PREP SHIPSTATION',
//   shippingProviderId: 49271,
//   primary: true
// }
