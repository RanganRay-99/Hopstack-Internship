module.exports = {
  getOrderDetail: require('./orders/getOrderDetail'),
  getOrderList: require('./orders/getOrderList'),
  addOrder: require('./orders/addOrder'),

  uploadImages: require('./images/uploadImages'),

  addProduct: require('./products/addProduct'),
  getCategoryList: require('./products/getCategoryList'),
  getProductDetail: require('./products/getProductDetail'),
  getProductList: require('./products/getProductList'),
  updateProductStock: require('./products/updateProductStock'),
  updateProductVariationStock: require('./products/updateProductVariationStock'),
  markOrderPacked: require("./orders/markOrderPacked"),
  markOrderShipped: require("./orders/markOrderShipped"),
}
