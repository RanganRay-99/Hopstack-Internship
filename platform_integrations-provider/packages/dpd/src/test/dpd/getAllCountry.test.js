const { getAllCountry } = require('../../../src')

const testFunction = async () => {
  const params = {}
  const data = await getAllCountry(params)
  console.log(data)
}

testFunction()
