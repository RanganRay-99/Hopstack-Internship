const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const createInboundShipment = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      shipmentName,
      senderAddress,
      destinationFulfillmentCenterId,
      areCasesRequired,
      shipmentStatus,
      shipment,
      marketplaceCountryCode,
      shipmentId,
      labelPrepPreference,
      intendedBoxContentsSource,
      region,
    } = params
    const reqBody = {
      InboundShipmentHeader: {
        ShipmentName: shipmentName,
        ShipFromAddress: {
          Name: senderAddress.name,
          AddressLine1: senderAddress.addressLine1,
          AddressLine2: senderAddress.addressLine2,
          City: senderAddress.city,
          StateOrProvinceCode: senderAddress.stateCode,
          CountryCode: senderAddress.countryCode,
          PostalCode: senderAddress.postalCode,
        },
        DestinationFulfillmentCenterId: destinationFulfillmentCenterId,
        AreCasesRequired: areCasesRequired,
        ShipmentStatus: shipmentStatus, // WORKING , SHIPPED , RECEIVING , CANCELLED , DELETED , CLOSED , ERROR , IN_TRANSIT , DELIVERED , CHECKED_IN
        LabelPrepPreference: labelPrepPreference, // SELLER_LABEL , AMAZON_LABEL_ONLY , AMAZON_LABEL_PREFERRED
        IntendedBoxContentsSource: intendedBoxContentsSource,
      },
      InboundShipmentItems: shipment.map((shipmentItem) => ({
        SellerSKU: shipmentItem.sku,
        FulfillmentNetworkSKU: shipmentItem.fulfillmentNetworkSKU,
        QuantityShipped: shipmentItem.quantityShipped,
        QuantityReceived: shipmentItem.quantityReceived,
        QuantityInCase: shipmentItem.quantityInCase,
        PrepDetailsList: shipmentItem.prepDetailsList,
      })),
      MarketplaceId: MarketPlaces[marketplaceCountryCode],
    }
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createInboundShipment',
      endpoint: 'fulfillmentInbound',
      body: reqBody,
      path: {
        shipmentId: shipmentId,
      },
      options: {
        version: 'v0',
        timeouts: {
          response: 600000,
          idle: 600000,
          deadline: 600000,
        },
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = createInboundShipment
