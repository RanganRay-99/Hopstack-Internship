const getToken = require('../../auth/getToken')
const axios = require('axios').default

const getLegacyItem = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, itemId } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const axiosConfig = {
      method: 'GET',
      url: `https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        legacy_item_id: itemId,
      },
    }

    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

// ;(async () => {
//   const param = {
//     clientId: 'x',
//     clientSecret: 'x',
//     refreshToken: 'x',
//     itemId: '144706752969',
//   }
//   const data = await getLegacyItem(param)
//   console.log(data)
//   console.log(data?.response?.data)
//   console.log(JSON.stringify(data?.response?.data))
// })()

module.exports = getLegacyItem
