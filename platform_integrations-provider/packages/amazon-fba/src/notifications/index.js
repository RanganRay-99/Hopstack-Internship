module.exports = {
  // Destination
  createDestination: require('./createDestination'),
  deleteDestination: require('./deleteDestination'),
  getAllDestinations: require('./getAllDestinations'),
  // Subscription
  createNotificationSubscription: require("./createNotificationSubscription"),
  deleteNotificationSubscription: require("./deleteNotificationSubscription"),
  getAllNotificationSubscriptionsByNotificationType: require("./getAllNotificationSubscriptionsByNotificationType")
}
