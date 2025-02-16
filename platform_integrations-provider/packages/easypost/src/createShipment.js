const axios = require('axios').default
const config = require('./config/config')

const Easypost = config.easypost

const createShipment = async (params) => {
  const { apiKey, toAddress, fromAddress, parcel, carbonOffset, service, carrierAccounts } = params

  Easypost.apiKey = apiKey || Easypost.apiKey

  const data = {
    shipment: {
      to_address: {
        id: toAddress,
      },
      from_address: {
        id: fromAddress,
      },
      parcel: {
        id: parcel,
      },
      carrier_accounts: carrierAccounts,
    },
  };

  const axiosConfig = {
    method: 'POST',
    url: `${Easypost.baseUrl}/v2/shipments`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(Easypost.apiKey).toString('base64')}`,
    },
    data,
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = createShipment
