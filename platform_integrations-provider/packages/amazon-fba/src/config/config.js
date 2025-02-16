const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    AWS_SP_API_ACCESS_TOKEN: Joi.string().required(),
    AWS_SP_API_REFRESH_TOKEN: Joi.string().required(),
    AWS_SELLING_PARTNER_APP_CLIENT_ID: Joi.string().required(),
    AWS_SELLING_PARTNER_APP_CLIENT_SECRET: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_SELLING_PARTNER_ROLE: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  aws: {
    access_token: envVars.AWS_SP_API_ACCESS_TOKEN,
    refresh_token: envVars.AWS_SP_API_REFRESH_TOKEN,
    client_id: envVars.AWS_SELLING_PARTNER_APP_CLIENT_ID,
    client_secret: envVars.AWS_SELLING_PARTNER_APP_CLIENT_SECRET,
    access_key: envVars.AWS_ACCESS_KEY_ID,
    secret_access_key: envVars.AWS_SECRET_ACCESS_KEY,
    selling_partner_role: envVars.AWS_SELLING_PARTNER_ROLE,
  },
}
