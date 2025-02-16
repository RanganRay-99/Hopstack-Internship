const { getToken } = require('@/config/auth')

const {
  confirmPreorder,
  confirmTransport,
  createInboundShipment,
  createInboundShipmentPlan,
  estimateTransport,
  getBillOfLading,
  getInboundGuidance,
  getInventorySummaries,
  getItemEligibilityPreview,
  getLabels,
  getPreorderInfo,
  getPrepInstructions,
  getShipmentItems,
  getShipmentItemsByShipmentId,
  getShipments,
  getTransportDetails,
  putTransportDetails,
  updateInboundShipment,
  voidTransport,
} = require('@/fba')

const {
  getOrders,
  getOrder,
  getOrderBuyerInfo,
  getOrderAddress,
  getOrderItems,
  getOrderItemsBuyerInfo,
  updateShipmentStatus,
  getOrderRegulatedInfo,
  updateVerificationStatus,
} = require('@/orders')

const { getMyFeesEstimateForSKU } = require('@/products')

const { listCatalogItems, getCatalogItem } = require('@/catalogs')

const { createFeedDocument, createFeed, getFeeds, getFeed, getFeedDocument, cancelFeed, uploadToS3 } = require('@/feeds')

const { getEligibleShipmentServices, getShipment, cancelShipment, createShipment } = require('@/merchantFulfillment')

const { getReports, getReport, createReport, cancelReport, getReportDocument } = require('@/reports')

const { createDestination , deleteDestination, getAllDestinations, createNotificationSubscription, deleteNotificationSubscription, getAllNotificationSubscriptionsByNotificationType} =  require('@/notifications')

const { getListingItem } = require('@/listings')

const {
  listHandoverSlots,
  getScheduledPackage,
  createScheduledPackage,
  updateScheduledPackages,
  createScheduledPackageBulk,
} = require('@/easyShip')

module.exports = {
  // FBA Inbound APIs
  getToken,
  confirmPreorder,
  confirmTransport,
  createInboundShipment,
  createInboundShipmentPlan,
  estimateTransport,
  getBillOfLading,
  getInboundGuidance,
  getInventorySummaries,
  getItemEligibilityPreview,
  getLabels,
  getPreorderInfo,
  getPrepInstructions,
  getShipmentItems,
  getShipmentItemsByShipmentId,
  getShipments,
  getTransportDetails,
  putTransportDetails,
  updateInboundShipment,
  voidTransport,
  // Order APIs
  getOrders,
  getOrder,
  getOrderBuyerInfo,
  getOrderAddress,
  getOrderItems,
  getOrderItemsBuyerInfo,
  updateShipmentStatus,
  getOrderRegulatedInfo,
  updateVerificationStatus,
  // Produts APIs
  getMyFeesEstimateForSKU,
  // Catalog APIs
  listCatalogItems,
  getCatalogItem,
  // Feeds APIs
  createFeedDocument,
  createFeed,
  getFeeds,
  getFeed,
  getFeedDocument,
  cancelFeed,
  uploadToS3,
  // Merchant Fulfillment
  getEligibleShipmentServices,
  getShipment,
  cancelShipment,
  createShipment,
  // Reports
  getReports,
  getReport,
  createReport,
  cancelReport,
  getReportDocument,
  // Easy Ship
  listHandoverSlots,
  getScheduledPackage,
  createScheduledPackage,
  updateScheduledPackages,
  createScheduledPackageBulk,
  // Notification 
  createDestination,
  deleteDestination,
  getAllDestinations,
  createNotificationSubscription,
  deleteNotificationSubscription,
  getAllNotificationSubscriptionsByNotificationType,
  // Listings
  getListingItem,
}
