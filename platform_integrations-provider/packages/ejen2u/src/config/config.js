const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required().default('development'),
    PORT: Joi.number().default(3000),
    EJEN2U_TOKEN: Joi.string().required(),
    EJEN2U_BASE_URL: Joi.string().required()
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  ejen2u: {
    EJEN2U_TOKEN: envVars.EJEN2U_TOKEN,
    EJEN2U_BASE_URL: envVars.EJEN2U_BASE_URL,
  },
}