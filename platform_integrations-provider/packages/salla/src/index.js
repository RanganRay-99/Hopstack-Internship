const getUserInfo = require('./users/getUserInfo');

module.exports = {
  // Auth
  getToken: require('./auth/getToken'),
  getTokenViaAuthCode: require('./auth/getTokenViaAuthCode'),
  // Orders
  getAllOrders: require('./orders/getAllOrders'),
  getOrderDetailsById: require('./orders/getOrderDetailsById'),
  getOrderStatusById: require('./orders/getOrderStatusById'),
  updateOrderStatusById: require('./orders/updateOrderStatusById'),
  getAllOrderStatus: require('./orders/getAllOrderStatus'),

  // Products
  getAllProducts: require('./products/getAllProducts'),
  getProductDetailsById: require('./products/getProductDetailsById'),
  updateProductQuantityById: require('./products/updateProductQuantityById'),
  updateProductQuantityBySku: require('./products/updateProductQuantityBySku'),
  
  //Users
  getUserInfo: require('./users/getUserInfo'),
}