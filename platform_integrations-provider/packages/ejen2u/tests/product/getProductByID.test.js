const { getProductByID } = require('../../src')

const testFunction = async () => {
  try {
    const params = { 
        baseUrl: "https://staging.rizmanruzainiempire.com", 
        token: "72c5a3582a",
        productId: 1
    }
    const response = await getProductByID(params)
    console.log(response)
  } catch (err) {
    console.log("error")
    return err
  }
}

testFunction()