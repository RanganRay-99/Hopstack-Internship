const axios = require('axios').default

const uploadToS3 = async (params) => {
  try {
    const { signedUrl, text } = params
    const axiosConfig = {
      method: 'put',
      url: signedUrl,
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8',
      },
      data: text,
    }
    const response = await axios(axiosConfig)
    if (response?.data === "") {
      return {
        error: false,
        message: 'Successfully uploaded to S3',
      }
    } else {
      return {
        error: true,
        message: 'please try again',
      }
    }
  } catch (err) {
      return err
  }
}

module.exports = uploadToS3
