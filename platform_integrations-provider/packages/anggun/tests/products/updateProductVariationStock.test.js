const { updateProductVariationStock } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'your_secret_key',
    itemId: 22,
    variationId: 4,
    stock: 12,
  }
  const data = await updateProductVariationStock(params)
  console.log(data)
}

testFunction()

const res = {
  request_id: 'ed4aeb690aaf7dec4fa780f17e11dd81',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
