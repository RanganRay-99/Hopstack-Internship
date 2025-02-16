const axios = require('axios').default
const config = require('../config/config')
const login = require('../login/login')
const { dpd } = config

let DPD_BASEURL = dpd.baseUrl
let DPD_USERNAME = dpd.username
let DPD_PASSWORD = dpd.password

const createShipment = async (params) => {
  try {
    const {
      username,
      password,
      baseUrl,
      collectionDate,
      networkCode,
      numberOfParcels,
      totalWeight,
      deliveryAddress,
      deliveryContact,
      deliveryNotification,
      collectionAddress,
      collectionContact,
      deliveryInstructions,
      shippingRef1,
      shippingRef2,
      shippingRef3
    } = params
    DPD_BASEURL = baseUrl || dpd.baseUrl
    DPD_USERNAME = username || dpd.username
    DPD_PASSWORD = password || dpd.password

    const loginParams = {
      username: DPD_USERNAME,
      password: DPD_PASSWORD,
      baseUrl: DPD_BASEURL,
    }

    const data = {
      jobId: null,
      collectionOnDelivery: false,
      invoice: null,
      collectionDate: collectionDate,
      consolidate: false,
      consignment: [
        {
          consignmentNumber: null,
          consignmentRef: null,
          parcel: [],
          collectionDetails: {
            contactDetails: {
              contactName: collectionContact.name,
              telephone: collectionContact.telephone,
            },
            address: {
              organisation: collectionAddress.organisation,
              countryCode: collectionAddress.countryCode,
              postcode: collectionAddress.postcode,
              street: collectionAddress.street,
              locality: collectionAddress.locality,
              town: collectionAddress.town,
              county: collectionAddress.county,
            },
          },
          deliveryDetails: {
            contactDetails: {
              contactName: deliveryContact.name,
              telephone: deliveryContact.telephone,
            },
            address: {
              organisation: deliveryAddress.organisation,
              countryCode: deliveryAddress.countryCode,
              postcode: deliveryAddress.postcode,
              street: deliveryAddress.street,
              locality: deliveryAddress.locality,
              town: deliveryAddress.town,
              county: deliveryAddress.county,
            },
            notificationDetails: {
              email: deliveryNotification.email,
              mobile: deliveryNotification.mobile,
            },
          },
          networkCode: networkCode,
          numberOfParcels: numberOfParcels,
          totalWeight: totalWeight, // KGs
          customsValue: null,
          deliveryInstructions: deliveryInstructions,
          parcelDescription: '',
          liabilityValue: null,
          liability: false,
          shippingRef1: shippingRef1,
          shippingRef2: shippingRef2,
          shippingRef3: shippingRef3
        },
      ],
    }

    const geoSessionToken = await login(loginParams)
    const axiosConfig = {
      method: 'POST',
      url: `${DPD_BASEURL}/shipping/shipment`,
      headers: {
        GeoClient: 'thirdparty/Hopstack',
        GeoSession: `${geoSessionToken}`,
        'Content-Type': 'application/json',
      },
      data,
    }

    const response = await axios(axiosConfig)
    return response.data.data
  } catch (err) {
    return err
  }
}

module.exports = createShipment
