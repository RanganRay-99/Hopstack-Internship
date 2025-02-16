const { getProductList } = require('../../src')

const testFunction = async () => {
  const params = {
    secretKey: 'secret_key',
    offset: 0,
    limit: 10,
    startDate: 1675881105,
    endDate: 1670575505,
    timeRangeField: 'create_time',
  }
  const data = await getProductList(params)
  console.log(JSON.stringify(data))
}

testFunction()

const res = {
  request_id: 'ed4aeb690aaf7dec4fa780f17e11dd81',
  code: 1,
  code_title: 'Error',
  code_description: 'invalid secret key',
}
