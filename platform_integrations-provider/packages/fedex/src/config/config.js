const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    FEDEX_API_BASEURL: Joi.string().required(),
    FEDEX_CLIENT_ID: Joi.string().required(),
    FEDEX_SECRET_KEY: Joi.string().required(),
    FEDEX_ACCOUNT_NUMBER: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  FEDEX_API_BASEURL: envVars.FEDEX_API_BASEURL,
  FEDEX_CLIENT_ID: envVars.FEDEX_CLIENT_ID,
  FEDEX_SECRET_KEY: envVars.FEDEX_SECRET_KEY,
  FEDEX_ACCOUNT_NUMBER: envVars.FEDEX_ACCOUNT_NUMBER,
}
