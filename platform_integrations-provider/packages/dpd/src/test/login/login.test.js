const  login  = require('../../login/login')
const config = require('../../config/config')
const shipstation = config.shipstation
const testFunction = async () => {
  const params = {
    
  }
  const data = await login(params)
  console.log(data)
}

testFunction()