const { stockOut } = require('../../src')

const testFunction = async () => {
  try {
    const params = { 
        baseUrl: "https://staging.rizmanruzainiempire.com", 
        token: "72c5a3582a", 
        productId: 1, 
        stockOut: 150, 
        qty: 100
    }
    const response = await stockOut(params)
    console.log(response)
  } catch (err) {
    console.log("error")
    return err
  }
}

testFunction()