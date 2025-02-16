const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const listHandoverSlots = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      marketplaceCountryCode,
      amazonOrderId,
      length,
      width,
      height,
      identifier,
      weight,
      region,
    } = params

    const body = {
      marketplaceId: MarketPlaces[marketplaceCountryCode],
      amazonOrderId,
      packageDimensions: {
        length,
        width,
        height,
        unit: 'Cm',
        identifier,
      },
      packageWeight: {
        value: weight,
        unit: 'G',
      },
    }

    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'listHandoverSlots',
      endpoint: 'easyShip',
      options: {
        version: '2022-03-23',
      },
      body,
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = listHandoverSlots
