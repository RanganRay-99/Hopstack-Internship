const { updateOrderStatus } = require('../../src')

const testFunction = async () => {
  try {
    const params = { 
        baseUrl: "https://staging.rizmanruzainiempire.com", 
        token: "72c5a3582a", 
        orderId: 938439, 
        orderStatus: "Shipping"
    }
    const response = await updateOrderStatus(params)
    console.log(response)
  } catch (err) {
    console.log("error")
    return err
  }
}

testFunction()