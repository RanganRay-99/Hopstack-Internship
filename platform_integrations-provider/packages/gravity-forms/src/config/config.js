const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required().default('development'),
    PORT: Joi.number().default(3000),
    GRAVITY_FORMS_BASE_URL: Joi.string().required(),
    GRAVITY_FORMS_CONSUMER_KEY: Joi.string().required(),
    GRAVITY_FORMS_CONSUMER_SECRET: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  gravityForms: {
    baseUrl: envVars.GRAVITY_FORMS_BASE_URL,
    consumerKey: envVars.GRAVITY_FORMS_CONSUMER_KEY,
    consumerSecret: envVars.GRAVITY_FORMS_CONSUMER_SECRET,
  },
}
