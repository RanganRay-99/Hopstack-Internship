const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DPD_BASEURL: Joi.string().required(),
    DPD_USERNAME: Joi.string(),
    DPD_PASSWORD: Joi.string(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  dpd: {
    baseUrl: envVars.DPD_BASEURL,
    username: envVars.DPD_USERNAME,
    password: envVars.DPD_PASSWORD
  }
}
