const  {  createLabel }  = require('../../../src')
const testFunction = async () => {
  const params = {
    shipmentId: 978296380
  }
  const data = await createLabel(params)
  console.log(data); // string
}

testFunction()