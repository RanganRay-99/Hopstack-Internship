const { productList } = require('../../src')

const testFunction = async () => {
  try {
    const params = { 
        baseUrl: "https://staging.rizmanruzainiempire.com", 
        token: "72c5a3582a",
    }
    const response = await productList(params)
    console.log(response)
  } catch (err) {
    console.log("error")
    return err
  }
}

testFunction()