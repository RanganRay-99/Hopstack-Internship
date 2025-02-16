const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const createScheduledPackageBulk = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, labelFormat, orderScheduleDetailsList, region } = params

    const body = {
      marketplaceId: MarketPlaces[marketplaceCountryCode],
      orderScheduleDetailsList: orderScheduleDetailsList.map((order) => ({
        amazonOrderId: order.amazonOrderId,
        packageDetails: {
          packageItems: order.items.map((item) => ({
            orderItemId: item.orderItemId,
            orderItemSerialNumbers: item.orderItemSerialNumbers,
          })),
          packageTimeSlot: {
            slotId: order.slotId,
            startTime: order.startTime, // ISO Date string
            endTime: order.endTime, // ISO Date string
            handoverMethod: order.handoverMethod, // Pickup | Dropoff
          },
          packageIdentifier: order.packageIdentifier,
        },
      })),
      labelFormat: labelFormat || 'PDF', // PDF | ZPL
    }

    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createScheduledPackageBulk',
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

module.exports = createScheduledPackageBulk
