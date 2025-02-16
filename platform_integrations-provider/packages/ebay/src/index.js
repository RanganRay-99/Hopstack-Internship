module.exports = {
  // Auth
  getToken: require('./auth/getToken'),
  getTokenViaAuthCode: require('./auth/getTokenViaAuthCode'),
  // Fulfillment
  getOrders: require('./sell/fulfillment/getOrders'),
  getOrder: require('./sell/fulfillment/getOrder'),
  getShippingFulfillment: require('./sell/fulfillment/getShippingFulfillment'),
  getShippingFulfillments: require('./sell/fulfillment/getShippingFulfillments'),
  createShippingFulfillment: require('./sell/fulfillment/createShippingFulfillment'),
  // Inventory
  getInventoryItems: require('./sell/inventory/getInventoryItems'),
  getInventory: require('./sell/inventory/getInventoryItem'),
  createOrReplaceInventoryItem: require('./sell/inventory/createOrReplaceInventoryItem'),
  deleteInventoryItem: require('./sell/inventory/deleteInventoryItem'),
  // Feeds
  createInventoryTask: require('./sell/feeds/createInventoryTask'),
  getInventoryTask: require('./sell/feeds/getInventoryTask'),
  getResultFile: require('./sell/feeds/getResultFile'),
  // Browse
  getLegacyItem: require('./buy/browse/getLegacyItem'),
}
