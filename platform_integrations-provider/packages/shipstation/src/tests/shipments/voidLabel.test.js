const { voidLabel } = require('../../../src')

const testFunction = async () => {
  const params = {
    shipmentId: 99125777
  }
  const data = await voidLabel(params)
  console.log(data)
}

testFunction()

// {
//   approved: false,
//   message: 'Refunds for this label are not allowed as this label has been used.'
// }

// { approved: true, message: null }