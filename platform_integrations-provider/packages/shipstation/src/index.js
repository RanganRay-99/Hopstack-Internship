
module.exports = {
  createLabel : require('./shipments/createLabel'),
  voidLabel : require('./shipments/voidLabel'),
  getShipmentRates: require('./shipments/getShipmentRates'),
  getAllShipments: require('./shipments/getAllShipments'),

  getCarrierByCarrierCode: require('./carriers/getCarrierByCarrierCode'),
  getAllCarriers: require('./carriers/getAllCarriers'),
  listServices: require("./carriers/listServices"), 

  getAllStores: require('./stores/getAllStores'),
  getAllMarketplaces: require('./stores/getAllMarketPlaces'),
  
  getAllProducts: require('./products/getAllProducts'),
  getProductById: require('./products/getProductById'),
  
  getAllOrders: require('./orders/getAllOrders'),
  getOrderById: require('./orders/getOrderById'),
  deleteOrderById: require('./orders/deleteOrderById'),

  getAllCustomers: require('./customers/getAllCustomers'),

  getAllFulfillments: require('./fulfillments/getAllFulfillments'),
  
}
