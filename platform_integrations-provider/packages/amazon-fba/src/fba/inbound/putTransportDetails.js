const { getSellingPartnerAPI } = require('@/utils')

const putTransportDetails = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      shipmentId,
      isPartneredCarrier,
      shipmentType,
      pack,
      partneredCarrierName,
      nonPartneredCarrierName,
      npspTrackingIds,
      pltlData,
      pallets,
      proNumber,
      totalWeight,
      declaredValue,
      fulfillmentType, // ENUM: { PSP | NPSP | PLTL | NPLTL }
      region,
    } = params

    let reqBody = {
      IsPartnered: isPartneredCarrier,
      ShipmentType: shipmentType, // SP -> "Small Parcel" || LTL -> "Less Than Truckload"
      TransportDetails: {
        PartneredSmallParcelData: {
          PackageList: pack.map((packItem) => ({
            Dimensions: {
              Length: packItem.length,
              Width: packItem.width,
              Height: packItem.height,
              Unit: 'inches', // inches or centimeters
            },
            Weight: { Value: packItem.weight, Unit: 'pounds' },
          })),
          CarrierName: partneredCarrierName,
        },
      },
    }

    if (fulfillmentType?.toUpperCase() === 'PSP') {
      reqBody = {
        IsPartnered: true,
        ShipmentType: 'SP', // SP -> "Small Parcel" || LTL -> "Less Than Truckload"
        TransportDetails: {
          PartneredSmallParcelData: {
            PackageList: pack.map((packItem) => ({
              Dimensions: {
                Length: packItem.length,
                Width: packItem.width,
                Height: packItem.height,
                Unit: 'inches', // inches or centimeters
              },
              Weight: { Value: packItem.weight, Unit: 'pounds' },
            })),
            CarrierName: partneredCarrierName,
          },
        },
      }
    } else if (fulfillmentType?.toUpperCase() === 'NPSP') {
      reqBody = {
        IsPartnered: false,
        ShipmentType: 'SP', // SP -> "Small Parcel" || LTL -> "Less Than Truckload"
        TransportDetails: {
          NonPartneredSmallParcelData: {
            CarrierName: nonPartneredCarrierName,
            PackageList: npspTrackingIds.map((trackingId) => ({
              TrackingId: trackingId,
            })),
          },
        },
      }
    } else if (fulfillmentType?.toUpperCase() === 'PLTL') {
      reqBody = {
        IsPartnered: true,
        ShipmentType: 'LTL', // SP -> "Small Parcel" || LTL -> "Less Than Truckload"
        TransportDetails: {
          PartneredLtlData: {
            Contact: {
              Name: pltlData.contactName,
              Phone: pltlData.contactPhone,
              Email: pltlData.contactEmail,
              Fax: pltlData.contactFax, // optional
            },
            BoxCount: pltlData.boxCount,
            SellerFreightClass: pltlData.sellerFreightClass,
            FreightReadyDate: pltlData.FreightReadyDate,
            PalletList: pallets.map((pallet) => ({
              Dimensions: {
                Length: pallet.length,
                Width: pallet.width,
                Height: pallet.height,
                Unit: 'inches', // inches or centimeters
              },
              Weight: { Value: pallet.weight, Unit: 'pounds' },
              IsStacked: pallet.isStacked,
            })),
            TotalWeight: {
              Value: totalWeight, // double
              Unit: 'pounds',
            },
            SellerDeclaredValue: declaredValue,
          },
        },
      }
    } else if (fulfillmentType?.toUpperCase() === 'NPLTL') {
      reqBody = {
        IsPartnered: false,
        ShipmentType: 'LTL', // SP -> "Small Parcel" || LTL -> "Less Than Truckload"
        TransportDetails: {
          NonPartneredLtlData: {
            CarrierName: nonPartneredCarrierName,
            ProNumber: proNumber,
          },
        },
      }
    }

    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'putTransportDetails',
      endpoint: 'fulfillmentInbound',
      path: {
        shipmentId: shipmentId,
      },
      body: reqBody,
      options: {
        version: 'v0',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = putTransportDetails
