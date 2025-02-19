const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    SALLA_BASEURL: Joi.string().required(),
    SALLA_CLIENT_ID: Joi.string().required(),
    SALLA_CLIENT_SECRET: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  salla: {
    baseUrl: envVars.SALLA_BASEURL,
    clientId: envVars.SALLA_CLIENT_ID,
    clientSecret: envVars.SALLA_CLIENT_SECRET,
  }
}
