const axios = require('axios').default
const config = require('../config/config')
const url = require('url')

const { anggun } = config

const addProduct = async (params) => {
  const {
    secretKey,
    categoryId,
    name,
    sku,
    price,
    stock,
    images,
    brand,
    status,
    weight,
    isPreOrder,
    isFreeGift,
    metaTitle,
    metaDescription,
    variationName,
    variations,
  } = params

  const body = {
    secretkey: secretKey,
    category_id: categoryId,
    name,
    item_sku: sku,
    price,
    stock,
    images, // array of string: ["https://xxx.jpg", "https://xxx.png"]
    brand,
    status,
    weight,
    is_pre_order: isPreOrder,
    free_gift: isFreeGift,
    meta_title: metaTitle || name,
    meta_description: metaDescription,
    variations_option_name: variationName,
    variations: variations.map((variation) => ({
      value_name: variation.valueName,
      variation_sku: variation.sku,
      price: variation.price,
      stock: variation.stock,
    })),
  }

  const formData = new url.URLSearchParams(body)

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/product/add_product`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData.toString(),
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = addProduct
