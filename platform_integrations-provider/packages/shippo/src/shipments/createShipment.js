const config = require('../config/config')
const axios = require('axios').default
const { shippo } = config
const processErrors = require('../utils/processError')

let SHIPPO_TOKEN = shippo.apiToken
let SHIPPO_BASEURL = shippo.baseUrl

const createShipment = async (params) => {
  const { shippoToken, shippoBaseUrl, addressTo, addressFrom, parcels, shipmentDate } = params

  SHIPPO_TOKEN = shippoToken || SHIPPO_TOKEN
  SHIPPO_BASEURL = shippoBaseUrl || SHIPPO_BASEURL
  const data = {
    address_to: {
      name: addressTo.name,
      street1: addressTo.street1,
      city: addressTo.city,
      state: addressTo.state,
      zip: addressTo.zip,
      country: addressTo.country,
      phone: addressTo.phone,
      email: addressTo.email,
    },
    address_from: {
      name: addressFrom.name,
      street1: addressFrom.street1,
      city: addressFrom.city,
      state: addressFrom.state,
      zip: addressFrom.zip,
      country: addressFrom.country,
      phone: addressFrom.phone,
      email: addressFrom.email,
    },
    parcels: parcels.map((parcel) => ({
      length: parcel.length,
      width: parcel.width,
      height: parcel.height,
      distance_unit: parcel.distanceUnit,
      weight: parcel.weight,
      mass_unit: parcel.weightUnit,
    })),
    shipment_date: shipmentDate,
  }
  const axiosConfig = {
    method: 'POST',
    url: `${SHIPPO_BASEURL}/shipments`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ShippoToken ${SHIPPO_TOKEN}`,
    },
    data,
  }
  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return {
      errors: processErrors(err),
    }
  }
}

module.exports = createShipment
