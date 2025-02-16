//module imports
const axios = require('axios').default
const { ups } = require('./config/config')
const generateShipmentLabelPNG = require('./generateShipmentLabelPNG')

const createShipment = async (params) => {
  const { shipment, items, sender, receiver, apiBaseURL, accessKey, accountNumber, password, userid } = params

  ups.baseUrl = apiBaseURL || ups.baseUrl
  ups.accessKey = accessKey || ups.accessKey
  ups.accountNumber = accountNumber || ups.accountNumber
  ups.userId = userid || ups.userId
  ups.password = password || ups.password

  const data = {
    ShipmentRequest: {
      Request: {
        SubVersion: '1801',
        RequestOption: 'nonvalidate',
        TransactionReference: {
          CustomerContext: '',
        },
      },
      Shipment: {
        Description: shipment.description || '',
        Shipper: {
          Name: sender.name,
          AttentionName: sender.name,
          TaxIdentificationNumber: sender.TaxIdentificationNumber,
          Phone: {
            Number: sender.phone,
          },
          ShipperNumber: ups.accountNumber,
          Address: {
            AddressLine: sender.address1,
            City: sender.city,
            StateProvinceCode: sender.state,
            PostalCode: sender.postcode,
            CountryCode: sender.country,
          },
        },
        ShipTo: {
          Name: receiver.name,
          AttentionName: receiver.name,
          Phone: {
            Number: receiver.phone,
          },
          TaxIdentificationNumber: receiver.TaxIdentificationNumber,
          Address: {
            AddressLine: receiver.address1,
            City: receiver.city,
            StateProvinceCode: receiver.state,
            PostalCode: receiver.postcode,
            CountryCode: receiver.country,
          },
        },
        ShipFrom: {
          Name: sender.name,
          AttentionName: sender.name,
          Phone: {
            Number: sender.phone,
          },
          TaxIdentificationNumber: sender.TaxIdentificationNumber,
          Address: {
            AddressLine: sender.address1,
            City: sender.city,
            StateProvinceCode: sender.state,
            PostalCode: sender.postcode,
            CountryCode: sender.country,
          },
        },
        PaymentInformation: {
          ShipmentCharge: {
            Type: '01',
            BillShipper: {
              AccountNumber: `${ups.accountNumber}`,
            },
          },
        },
        Service: {
          Code: shipment.serviceCode || '01',
          Description: 'Express',
        },
        // Valid values: 01 = Next Day Air 02 = 2nd Day Air 03 = Ground 07 = Express 08 = Expedited 11 = UPS Standard 12 = 3 Day Select 13 = Next Day Air Saver 14 = UPS Next Day Air� Early 17 = UPS Worldwide Economy DDU 54 = Express Plus 59 = 2nd Day Air A.M. 65 = UPS Saver M2 = First Class Mail M3 = Priority Mail M4 = Expedited MaiI Innovations M5 = Priority Mail Innovations M6 = Economy Mail Innovations M7 = MaiI Innovations (MI) Returns 70 = UPS Access Point� Economy 71 = UPS Worldwide Express Freight Midday 72 = UPS Worldwide Economy DDP 74 = UPS Express�12:00 75 = UPS Heavy Goods 82 = UPS Today Standard 83 = UPS Today Dedicated Courier 84 = UPS Today Intercity 85 = UPS Today Express 86 = UPS Today Express Saver 96 = UPS Worldwide Express Freight.
        Package: items.map((item) => ({
          Description: item.description,
          Packaging: {
            Code: '02',
          },
          Dimensions: {
            UnitOfMeasurement: {
              Code: 'IN',
              Description: 'Inches',
            },
            Length: item.length,
            Width: item.width,
            Height: item.height,
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: item.weightUOM || 'LBS',
              Description: 'Pounds',
            },
            Weight: item.weight,
          },
          PackageServiceOptions: '',
        })),
        ItemizedChargesRequestedIndicator: '',
        RatingMethodRequestedIndicator: '',
        TaxInformationIndicator: '',
        ShipmentRatingOptions: {
          NegotiatedRatesIndicator: '',
        },
      },
      LabelSpecification: {
        LabelImageFormat: {
          Code: 'PNG',
        },
      },
    },
  }

  const axiosConfig = {
    method: 'post',
    url: `${ups.baseUrl}/ship/v1/shipments`,
    headers: {
      AccessLicenseNumber: ups.accessKey,
      Password: ups.password,
      transID: shipment.shipmentID,
      transactionSrc: ups.userId,
      Username: ups.userId,
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    let response = await axios(axiosConfig)
    // const labelUrl = await generateShipmentLabelPNG(response.data)
    // response.data.labelUrl = labelUrl
    if (items.length == 1) {
      response.data.ShipmentResponse.ShipmentResults.PackageResults = [
        response.data.ShipmentResponse.ShipmentResults.PackageResults,
      ]
    }
    return response.data
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = createShipment
