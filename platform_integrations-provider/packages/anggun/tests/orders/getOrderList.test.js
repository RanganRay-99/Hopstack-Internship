const { getOrderList } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'secret_key',
    startDate: 1575881105,
    endDate: 1670575505,
    orderStatus: undefined,
    customerId: undefined,
    offset: 2,
    limit: 2,
  }
  const data = await getOrderList(params)
  console.log(data)
}

testFunction()

const res = {
  request_id: 'd46ae3cc58140c7d933a8243b22e8b32',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
