const axios = require('axios').default
const config = require('../config/config')

const { anggun } = config

const uploadImages = async (params) => {
  const { secretKey, images } = params

  const axiosConfig = {
    method: 'POST',
    url: `${anggun.baseUrl}/api/v1/image/upload_image`,
    headers: {
      'Content-Type': 'application/json',
    },
    query: {
      secretkey: secretKey,
      images,
    },
    data: {},
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = uploadImages
