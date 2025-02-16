const { stockIn } = require('../../src')

const testFunction = async () => {
  try {
    const params = { 
        baseUrl: "https://staging.rizmanruzainiempire.com", 
        token: "72c5a3582a", 
        productId: 1, 
        lastStock: 300, 
        qty:100
    }
    const response = await stockIn(params)
    console.log(response)
  } catch (err) {
    console.log("error")
    return err
  }
}

testFunction()