const getProducts = require('./getProducts')
const axios = require('axios').default
const { Blob } = require( 'buffer'); 

function getObjectSizeInBytes(obj) {
  const stringifiedObject = JSON.stringify(obj)
  return new Blob([stringifiedObject], {type: 'application/json'}).size
}

const getAllProducts = async (params) => {
  const { apiUrl } = params
  console.log("Calling Shopify Get All PRODUCTS", apiUrl)
  const response = await getProducts(params)
  console.log(`1st Call | Shopify Products | Response length: ${response?.products?.length} | siz: ${getObjectSizeInBytes(response)}`)

  let { link } = response.headers

  if (link === undefined) {
    console.log('no more link for shopify product call')
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
      console.log("Shopify Prducts | Call Count", ++callCount)
      console.log("Shopify Products | axios request", axiosConfig)
      const nextResponse = await axios(axiosConfig)

      response.products.push(...nextResponse.data.products)

      console.log(`${callCount} | Shopify Product Call | response length: ${response?.products?.length} | siz: ${getObjectSizeInBytes(response)}`)
     
      link = nextResponse.headers.link
      hasNext = link.includes('next')
      hasPrev = link.includes('previous')
    }
  }
  console.log(`FINAL | Shopify Products | Response length: ${response?.products?.length} | siz: ${getObjectSizeInBytes(response)}`)
  delete response.headers
  return response
}

module.exports = getAllProducts
