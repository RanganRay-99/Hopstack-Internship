module.exports = {
  stockIn: require('./serviceStock/stockIn'),
  stockOut: require('./serviceStock/stockOut'),
  updateOrderStatus: require('./order/updateOrderStatus'),
  orderList: require('./order/orderList'),
  updateShippingLabel: require('./order/updateShippingLabel'),
  productList: require('./product/productList'),
  getProductByID: require('./product/getProductByID'),
}
