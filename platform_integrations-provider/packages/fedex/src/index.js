module.exports = {
  getToken: require("./config/auth"),
  ratesAndTransit: require("./rates/ratesAndTransit"),
  cancelShipment: require("./shipment/cancelShipment"),
  createShipment: require("./shipment/createShipment"),
  byReference: require("./tracking/byReference"),
  byTrackingControlNumber: require("./tracking/byTrackingControlNumber"),
  byTrackingNumber: require("./tracking/byTrackingNumber"),
  multiplePieceShipment: require("./tracking/multiplePieceShipment"),
}
