const { getSellingPartnerAPI } = require('@/utils')

const createInboundShipmentPlan = async (params) => {
  try {
    const { token, clientID, clientSecret, senderAddress, receiverAddress, shipment, labelPrepPreference, region } = params
    const reqBody = {
      ShipFromAddress: {
        Name: senderAddress.name,
        AddressLine1: senderAddress.addressLine1,
        AddressLine2: senderAddress.addressLine2,
        City: senderAddress.city,
        StateOrProvinceCode: senderAddress.stateCode,
        CountryCode: senderAddress.countryCode,
        PostalCode: senderAddress.postalCode,
      },
      LabelPrepPreference: labelPrepPreference, // SELLER_LABEL || AMAZON_LABEL_ONLY	 || AMAZON_LABEL_PREFERRED
      ShipToCountryCode: receiverAddress.countryCode,
      InboundShipmentPlanRequestItems: shipment.map((shipmentItem) => ({
        SellerSKU: shipmentItem.sku,
        ASIN: shipmentItem.asin,
        Condition: shipmentItem.condition || 'NewItem',
        Quantity: shipmentItem.quantity,
        QuantityInCase: shipmentItem.quantityInCase,
        PrepDetailsList: shipmentItem.prepDetailsList,
      })),
    }
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'createInboundShipmentPlan',
      endpoint: 'fulfillmentInbound',
      body: reqBody,
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

module.exports = createInboundShipmentPlan
