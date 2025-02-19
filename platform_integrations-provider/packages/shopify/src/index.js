module.exports = {
  getAccessToken: require('./getAccessToken'),
  // Orders
  getOrders: require('./orders/getAllOrders'),
  getOrder: require('./orders/getOrder'),
  cancelOrder: require('./orders/cancelOrder'),
  closeOrder: require('./orders/closeOrder'),
  updateOrder: require('./orders/updateOrder'),
  // Products
  createProduct: require('./products/createProduct'),
  getProducts: require('./products/getAllProducts'),
  updateProduct: require('./products/updateProduct'),
  // Inventory
  getInventories: require('./inventory/getInventories'),
  getInventory: require('./inventory/getInventory'),
  updateInventory: require('./inventory/updateInventory'),
  // Refund
  createRefund: require('./refund/createRefund'),
  // Fullfilment
  getFulfillmentOrders: require('./fulfillments/getFulfillmentOrders'),
  createFulfilllment: require('./fulfillments/createfulfillment'),
  completefulfillment: require('./fulfillments/completefulfillment'),
  closeFulfillment: require('./fulfillments/closeFulfillment'),
  updateFulfillment: require('./fulfillments/updateFulfillment'),
  updateTrackingInfo: require('./fulfillments/updateTrackingInfo'),
  updateOrderTrackingInfo: require('./fulfillments/updateOrderTrackingInfo'),
  // Location
  getLocation: require('./location/getLocation'),
  getLocations: require('./location/getLocations'),
  // Inventory-Level
  adjustQuantityOfInventoryItemByLocationId: require('./inventory-level/adjustQuantityOfInventoryItemByLocationId'),
  setQuantityOfInventoryItemByLocationId: require('./inventory-level/setQuantityOfInventoryItemByLocationId'),
  connectInventoryItemToLocationId: require('./inventory-level/connectInventoryItemToLocationId'),
  deleteInventoryItemFromLocationsId: require('./inventory-level/deleteInventoryItemFromLocationId'),
}
