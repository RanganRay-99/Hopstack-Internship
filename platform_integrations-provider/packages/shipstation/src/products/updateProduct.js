const axios = require('axios').default
const config = require('../config/config')

const Shipstation = config.shipstation

const updateProduct = async (params) => {
  let { apiKey, apiSecret, productId, productDetails, shippingDetails, productDimension, customsDetails } = params

  Shipstation.apiKey = apiKey || Shipstation.apiKey
  Shipstation.apiSecret = apiSecret || Shipstation.apiSecret

  const data = {
    aliases: null,
    productId: productId,
    sku: productDetails.sku,
    name: productDetails.name,
    price: productDetails.cost,
    defaultCost: productDetails.defaultCost,
    length: productDimension.length,
    width: productDimension.width,
    height: productDimension.height,
    weightOz: productDimension.weightOz,
    internalNotes: null,
    fulfillmentSku: null,
    active: productDetails.isActive,
    productCategory: productDetails.category,
    productType: productDetails.type,
    warehouseLocation: shippingDetails.warehouseLocation,
    defaultCarrierCode: shippingDetails.defaultCarrierCode,
    defaultServiceCode: shippingDetails.defaultIntlServiceCode,
    defaultPackageCode: shippingDetails.packageCode,
    defaultIntlCarrierCode: shippingDetails.defaultIntlCarrierCode,
    defaultIntlServiceCode: shippingDetails.defaultIntlServiceCode,
    defaultIntlPackageCode: shippingDetails.defaultIntlPackageCode,
    defaultConfirmation: shippingDetails.defaultconfirmation,
    defaultIntlConfirmation: shippingDetails.defaultIntlConfirmation,
    customsDescription: customsDetails.description,
    customsValue: customsDetails.value,
    customsTariffNo: customsDetails.tarrifNo,
    customsCountryCode: customsDetails.countryCode,
    noCustoms: customsDetails.noCustom,
    tags: null,
  }

  const axiosConfig = {
    method: 'PUT',
    url: `${Shipstation.baseUrl}/products/${productId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${Shipstation.apiKey}:${Shipstation.apiSecret}`).toString('base64')}`,
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

module.exports = updateProduct
