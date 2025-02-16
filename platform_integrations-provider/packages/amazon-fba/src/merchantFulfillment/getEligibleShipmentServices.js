const { getSellingPartnerAPI } = require('@/utils')

const getEligibleShipmentServices = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      amazonOrderId,
      sellerOrderId,
      itemList,
      shipment,
      senderAddress,
      deliveryExperience,
      declaredValue,
      carrierWillPickUp,
      carrierWillPickUpOption,
      labelFormat,
      mustArriveByDate,
      shipDate,
      customTextForLabel,
      standardIdForLabel,
      includePackingSlipWithLabel,
      includeComplexShippingOptions,
      region,
    } = params
    const body = {
      ShipmentRequestDetails: {
        AmazonOrderId: amazonOrderId,
        SellerOrderId: sellerOrderId,
        ItemList: itemList.map((item) => ({
          OrderItemId: item.orderItemId,
          Quantity: item.quantity,
          ItemWeight: {
            Unit: item.weight,
            Value: shipment.weightUnit,
          },
          ItemDescription: item.description,
          TransparencyCodeList: item.transparencyCodeList,
          ItemLevelSellerInputsList: item.itemLevelSellerInputsList.map((input) => ({
            AdditionalInputFieldName: input.additionalInputFieldName,
            AdditionalSellerInput: {
              DataType: input?.dataType,
              ValueAsString: input?.valueAsString,
              ValueAsBoolean: input?.valueAsBoolean,
              ValueAsInteger: input?.valueAsInteger,
              ValueAsTimestamp: input?.valueAsTimestamp,
              ValueAsAddress: {
                Name: input.address.name,
                AddressLine1: input.address.addressLine1,
                AddressLine2: input.address.addressLine2,
                AddressLine3: input.address.addressLine3,
                DistrictOrCounty: input.address.districtOrCounty,
                Email: input.address.email,
                City: input.address.city,
                StateOrProvinceCode: input.address.stateOrProvinceCode,
                PostalCode: input.address.postalCode,
                CountryCode: input.address.countryCode,
                Phone: input.address.phone,
              },
              ValueAsWeight: {
                Unit: input.weightUnit,
                Value: input.weight,
              },
              ValueAsDimension: {
                Unit: input.lengthUnit,
                Value: input.length,
              },
              ValueAsCurrency: {
                Amount: input.amount,
                CurrencyCode: input.currencyCode,
              },
            },
          })),
        })),
        PackageDimensions: {
          Length: shipment.length,
          Width: shipment.weight,
          Height: shipment.height,
          Unit: shipment.lengthUnit,
          PredefinedPackageDimensions: shipment.predefinedPackageDimensions,
        },
        ShipFromAddress: {
          Name: senderAddress.name,
          AddressLine1: senderAddress.addressLine1,
          AddressLine2: senderAddress.addressLine2,
          AddressLine3: senderAddress.addressLine3,
          DistrictOrCounty: senderAddress.districtOrCounty,
          Email: senderAddress.email,
          City: senderAddress.city,
          StateOrProvinceCode: senderAddress.stateOrProvinceCode,
          PostalCode: senderAddress.postalCode,
          CountryCode: senderAddress.countryCode,
          Phone: senderAddress.phone,
        },
        ShippingServiceOptions: {
          CarrierWillPickUp: carrierWillPickUp,
          DeliveryExperience: deliveryExperience,
          DeclaredValue: {
            Amount: declaredValue.amount,
            CurrencyCode: declaredValue.currencyCode,
          },
          CarrierWillPickUpOption: carrierWillPickUpOption,
          LabelFormat: labelFormat || 'PDF',
        },
        Weight: {
          Unit: shipment.weightUnit,
          Value: shipment.weight,
        },
        MustArriveByDate: mustArriveByDate,
        ShipDate: shipDate,
        LabelCustomization: {
          CustomTextForLabel: customTextForLabel,
          StandardIdForLabel: standardIdForLabel,
        },
      },
      ShippingOfferingFilter: {
        IncludePackingSlipWithLabel: includePackingSlipWithLabel,
        IncludeComplexShippingOptions: includeComplexShippingOptions,
        CarrierWillPickUp: carrierWillPickUp,
        DeliveryExperience: deliveryExperience,
      },
    }
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getEligibleShipmentServices',
      endpoint: 'merchantFulfillment',
      body,
      options: {
        version: 'v0',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = getEligibleShipmentServices
