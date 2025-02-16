const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const createScheduledPackage = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      amazonOrderId,
      marketplaceCountryCode,
      items,
      slotId,
      startTime,
      endTime,
      handoverMethod,
      packageIdentifier,
      region,
    } = params

    const body = {
      amazonOrderId,
      marketplaceId: MarketPlaces[marketplaceCountryCode],
      packageDetails: {
        packageItems: items.map((item) => ({
          orderItemId: item.orderItemId,
          orderItemSerialNumbers: item.orderItemSerialNumbers,
        })),
        packageTimeSlot: {
          slotId,
          startTime, // ISO Date string
          endTime, // ISO Date string
          handoverMethod, // Pickup | Dropoff
        },
        packageIdentifier,
      },
    }

    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createScheduledPackage',
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

module.exports = createScheduledPackage
