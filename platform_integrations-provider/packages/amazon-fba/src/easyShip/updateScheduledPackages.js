const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const updateScheduledPackages = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, items, region } = params

    const body = {
      marketplaceId: MarketPlaces[marketplaceCountryCode],
      updatePackageDetailsList: items.map((item) => ({
        scheduledPackageId: {
          amazonOrderId: item.amazonOrderId,
          packageId: item.packageId,
        },
        packageTimeSlot: {
          slotId: item.slotId,
          startTime: item.startTime, // ISO Date string
          endTime: item.endTime, // ISO Date string
          handoverMethod: item.handoverMethod, // Pickup | Dropoff
        },
      })),
    }

    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'updateScheduledPackages',
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

module.exports = updateScheduledPackages
