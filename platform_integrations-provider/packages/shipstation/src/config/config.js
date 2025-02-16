const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    SHIPSTATION_BASEURL: Joi.string().required(),
    SHIPSTATION_API_KEY: Joi.string(),
    SHIPSTATION_API_SECRET: Joi.string(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  shipstation: {
    baseUrl: envVars.SHIPSTATION_BASEURL,
    apiKey: envVars.SHIPSTATION_API_KEY,
    apiSecret: envVars.SHIPSTATION_API_SECRET
  }
}
