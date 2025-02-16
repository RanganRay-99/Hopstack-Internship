const { getOrderDetail } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'secret_key',
    orderId: '1000001',
  }
  const data = await getOrderDetail(params)
  console.log(data)
}

testFunction()

const res = {
  request_id: 'ed4aeb690aaf7dec4fa780f17e11dd81',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
