const { addOrder } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'your_api_key',
    sender: {
      name: 'Teh Yin Seen	',
      streetAddress: 'No. 22G, Ground Floor, Jalan Temenggung 1/9',
      city: 'Cheras',
      zipcode: '43200',
      state: 'Selangor',
      country: 'MY',
    },
    receiver: {
      name: 'Receiver name',
      phone: '60102994509',
      email: 'sample@yahoo.com',
      streetAddress: 'No. 22G, Ground Floor, Jalan Temenggung 1/9',
      city: 'Cheras',
      zipcode: '43200',
      state: 'Selangor',
      country: 'MY',
    },
    order: {
      status: 'Payment Paid',
      paymentMethod: 'kiplepay',
      paymentReference: 'TOD10920220321170247',
      createDate: '1608271872',
      transactionDate: '1608272872',
      updateDate: '1608272872',
      shippingService: 'ninjavan',
      trackingId: 'NVMYBGPHA0BP320344',
      shippingTotal: 10.0,
      finalTotal: 30.0,
      comment: 'Ship on weekend',
    },
    items: [
      {
        name: 'Gwp Morinaga Porcelain Plate (Set A)',
        sku: '137127EA',
        weight: 0.9,
        quantity: 2,
        total: 20.0,
        isGift: false,
        skipMatchItem: false,
      },
    ],
  }
  const data = await addOrder(params)
  console.log(data)
}

testFunction()

const res = {
  request_id: 'ed4aeb690aaf7dec4fa780f17e11dd81',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
