const config = require('@/config/config')
const axios = require('axios')

const AWS_REFRESH_TOKEN = config.aws.refresh_token
const AWS_SELLING_PARTNER_APP_CLIENT_ID = config.aws.client_id
const AWS_SELLING_PARTNER_APP_CLIENT_SECRET = config.aws.client_secret

const getToken = async (req, res, next) => {
  const axiosConfig = {
    method: 'post',
    url: `https://api.amazon.com/auth/o2/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: AWS_REFRESH_TOKEN,
      client_id: AWS_SELLING_PARTNER_APP_CLIENT_ID,
      client_secret: AWS_SELLING_PARTNER_APP_CLIENT_SECRET,
    },
  }

  try {
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  getToken,
}
