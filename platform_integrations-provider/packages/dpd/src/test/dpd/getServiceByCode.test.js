const { getServiceByCode } = require('../../../src')
const config = require('../../config/config')
const shipstation = config.shipstation
const testFunction = async () => {
  const params = {
    geoServiceCode: '101',
  }
  const data = await getServiceByCode(params)
  console.log(data)
}

testFunction()
