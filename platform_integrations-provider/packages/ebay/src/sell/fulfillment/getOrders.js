const getToken = require('../../auth/getToken')
const axios = require('axios').default

const createFilterString = (filter) => {
  let res = ''
  if (filter?.creationdate) {
    res = `creationdate:[${filter.creationdate}..${new Date().toISOString()}]`
  }
  if (filter?.lastmodifieddate) {
    res = res
      ? `${res},lastmodifieddate:[${filter.lastmodifieddate}..${new Date().toISOString()}]`
      : `lastmodifieddate:[${filter.lastmodifieddate}..${new Date().toISOString()}]`
  }
  if (filter?.orderfulfillmentstatus) {
    res = res
      ? `${res},orderfulfillmentstatus:{${filter.orderfulfillmentstatus.join('|')}}`
      : `orderfulfillmentstatus:{${filter.orderfulfillmentstatus.join('|')}}`
  }
  console.log(res)
  return res
}

const getOrders = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, orderIds, filter, limit, offset, fieldGroups } = params
    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })
    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/fulfillment/v1/order`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        orderIds,
        filter: createFilterString(filter),
        limit,
        offset,
        fieldGroups,
      },
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

// ;(async () => {
//   const ebay_REFRESH_TOKEN = 'v^1.NFXjI2MA=='
//   const EBAY_APP_CLIENT_ID = 'Ho05e'
//   const EBAY_APP_CLIENT_SECRET = 'PRda4'
//   var param = {
//     clientId: EBAY_APP_CLIENT_ID,
//     clientSecret: EBAY_APP_CLIENT_SECRET,
//     refreshToken: ebay_REFRESH_TOKEN,
//     filter: {
//       creationdate: new Date().toISOString(),
//       lastmodifieddate: new Date().toISOString(),
//       orderfulfillmentstatus: ['IN_PROGRESS', 'FULFILLED'],
//     },
//   }
//   var data = await getOrders(param)
//   console.log(data)
// })()

module.exports = getOrders
