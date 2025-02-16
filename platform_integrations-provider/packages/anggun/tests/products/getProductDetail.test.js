const { getProductDetail } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'your_secret_key',
    itemId: 'item_id',
  }
  const data = await getProductDetail(params)
  console.log(data)
}

testFunction()

const res = {
  request_id: 'ed4aeb690aaf7dec4fa780f17e11dd81',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
