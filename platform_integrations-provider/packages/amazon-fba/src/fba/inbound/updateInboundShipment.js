const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const updateInboundShipment = async (params) => {
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
      InboundShipmentItems: [],
      MarketplaceId: MarketPlaces[marketplaceCountryCode],
    }
    for (let i = 0; i < shipment.length; i++) {
      const item = {
        SellerSKU: shipment[i].sku,
        FulfillmentNetworkSKU: shipment[i].fulfillmentNetworkSKU,
        QuantityShipped: shipment[i].quantityShipped,
        QuantityReceived: shipment[i].quantityReceived,
        QuantityInCase: shipment[i].quantityInCase,
        PrepDetailsList: shipment[i].prepDetailsList,
      }
      reqBody.InboundShipmentItems.push(item)
    }
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'updateInboundShipment',
      endpoint: 'fulfillmentInbound',
      body: reqBody,
      path: {
        shipmentId: shipmentId,
      },
      options: {
        version: 'v0',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = updateInboundShipment
