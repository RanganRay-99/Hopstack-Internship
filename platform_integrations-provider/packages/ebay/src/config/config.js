const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    EBAY_APP_CLIENT_ID: Joi.string().required(),
    EBAY_APP_CLIENT_SECRET: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  ebay: {
    refresh_token: envVars.EBAY_APP_DEFAULTREFRESHTOKEN,
    client_id: envVars.EBAY_APP_CLIENT_ID,
    client_secret: envVars.EBAY_APP_CLIENT_SECRET,
  },
}
