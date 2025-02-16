const { orderList } = require('../../src')

const testFunction = async () => {
  try {
    const params = { 
        baseUrl: "https://staging.rizmanruzainiempire.com", 
        token: "72c5a3582a",
        startDate: "2023-01-06",
        endDate: new Date()
    }
    const response = await orderList(params)
    console.log(response)
    // console.log(new Date().toJSON().slice(0, 10))
  } catch (err) {
    console.log("error")
    return err
  }
}

testFunction()