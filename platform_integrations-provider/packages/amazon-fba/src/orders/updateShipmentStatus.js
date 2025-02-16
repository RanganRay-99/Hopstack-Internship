const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces, ShipmentStatus } = require('@/config/constants')

const updateShipmentStatus = async (params) => {
  try {
    const { token, clientID, clientSecret, marketplaceCountryCode, shipmentStatus, orderId, orderItems, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'updateShipmentStatus',
      endpoint: 'orders',
      body: {
        marketplaceId: MarketPlaces[marketplaceCountryCode],
        shipmentStatus: ShipmentStatus[shipmentStatus],
        orderItems: orderItems.map((item) => ({
          orderItemId: item.orderItemId,
          quantity: item.quantity,
        })),
      },
      path: {
        orderId: orderId,
      },
      options: {
        version: 'v0',
      },
    })
    return 'Success'
  } catch (err) {
    return err
  }
}

module.exports = updateShipmentStatus
