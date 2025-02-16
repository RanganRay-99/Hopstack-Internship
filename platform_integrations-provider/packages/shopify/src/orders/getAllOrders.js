const getOrders = require('./getOrders')
const axios = require('axios').default
const { Blob } = require( 'buffer'); 

function getObjectSizeInBytes(obj) {
  const stringifiedObject = JSON.stringify(obj)
  return new Blob([stringifiedObject], {type: 'application/json'}).size
}

const getAllOrders = async (params) => {
  const { apiUrl } = params
  console.log("Calling Shopify Get All ORDERS", apiUrl)
  const response = await getOrders(params)
  console.log(`1st Call | Shopify Orders | Response length: ${response?.orders?.length} | siz: ${getObjectSizeInBytes(response)}`)

  let { link } = response.headers

  if (link === undefined) {
    console.log('no more link for shopify order call')
  } else {
    let nextUrl = ''
    let hasNext = link.includes('next')
    let hasPrev = link.includes('previous')

    let callCount = 1

    while (hasNext) {
      if (hasNext && hasPrev) {
        const indexOfNext = link.indexOf('next')
        const indexOfPrev = link.indexOf('previous')
        if (indexOfNext < indexOfPrev) {
          nextUrl = link.slice(1, link.indexOf('>'))
        } else {
          nextUrl = link.slice(link.lastIndexOf('<') + 1, link.lastIndexOf('>'))
        }
      } else if (hasNext) {
        nextUrl = link.slice(1, link.indexOf('>'))
      } else {
        console.log('no next link')
        break
      }

      const tok = apiUrl.slice(8, apiUrl.indexOf('@'))
      const Basic = `Basic ${Buffer.from(tok).toString('base64')}`

      const axiosConfig = {
        method: 'GET',
        url: nextUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: Basic,
        },
      }
      console.log("Shopify Order | Call Count", ++callCount)
      console.log("Shopify Order | axios request", axiosConfig)
      const nextResponse = await axios(axiosConfig)

      response.orders.push(...nextResponse.data.orders)

      console.log(`${callCount} | Shopify Order Call | response length: ${response?.orders?.length} | siz: ${getObjectSizeInBytes(response)}`)

      link = nextResponse.headers.link
      hasNext = link.includes('next')
      hasPrev = link.includes('previous')
    }
  }
  console.log(`FINAL | Shopify Orders | Response length: ${response?.orders?.length} | siz: ${getObjectSizeInBytes(response)}`)
  delete response.headers
  return response
}

module.exports = getAllOrders
