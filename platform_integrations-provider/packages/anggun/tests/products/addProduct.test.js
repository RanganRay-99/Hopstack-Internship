const { addProduct } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'asdgfsdg',
    categoryId: 178,
    name: 'APRIL PANTS IN NAVY',
    sku: 'PAN-NV-01',
    price: '149',
    stock: 13,
    images: ['https://xxx.jpg', 'https://xxx.png'],
    brand: 'Colgate',
    weight: 0.9,
    isPreOrder: false,
    isFreeGift: false,
    metaTitle: 'APRIL PANTS IN NAVY',
    metaDescription: 'April pants cut from lightweight viscose make it the perfect choice for sunny city stroll.',
    variationName: 'Size',
    variations: [
      {
        valueName: 'XS',
        sku: 'PAN-NV-01-XS',
        price: 2.0,
        stock: 2,
      },
    ],
  }
  const data = await addProduct(params)
  console.log(data)
}

testFunction()

const res = {
  request_id: 'ed4aeb690aaf7dec4fa780f17e11dd81',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
