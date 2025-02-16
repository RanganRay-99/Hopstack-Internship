const config = require('@/config/config')
const SellingPartnerAPI = require('amazon-sp-api')

const AWS_REFRESH_TOKEN = config.aws.refresh_token
const AWS_SELLING_PARTNER_APP_CLIENT_ID = config.aws.client_id
const AWS_SELLING_PARTNER_APP_CLIENT_SECRET = config.aws.client_secret
const AWS_ACCESS_KEY_ID = config.aws.access_key
const AWS_SECRET_ACCESS_KEY = config.aws.secret_access_key
const AWS_SELLING_PARTNER_ROLE = config.aws.selling_partner_role

const getSellingPartnerAPI = (token, clientID, clientSecret, region = 'na') =>
  new SellingPartnerAPI({
    region,
    refresh_token: token,
    credentials: {
      SELLING_PARTNER_APP_CLIENT_ID: clientID,
      SELLING_PARTNER_APP_CLIENT_SECRET: clientSecret,
      AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
      AWS_SELLING_PARTNER_ROLE: AWS_SELLING_PARTNER_ROLE,
    },
    options: {
      use_sandbox: false,
    },
  })

const getQueryStr = (obj) =>
  Object.keys(obj)
    .map(function (key) {
      return key + '=' + obj[key]
    })
    .join('&')

module.exports = {
  getSellingPartnerAPI,
  getQueryStr,
}
