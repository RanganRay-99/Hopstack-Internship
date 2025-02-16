module.exports = {
  getShipmentRates: require('./rates/getShipmentRates'),
  createShipment: require('./shipments/createShipment'),
  listAllShipments: require('./shipments/listAllShipments'),
  getShipmentTrackingStatus: require('./trackingstatus/getShipmentTrackingStatus'),
  getShippingLabelByRateId: require('./transactions/getShippingLabelByRateId'),
  getAllCarriers: require('./carriers/getAllCarriers'),
  getShippingLabelByCarrierId: require('./transactions/getShippingLabelByCarrierId'),
  voidShippingLabel: require('./refunds/voidShippingLabel'),
}
