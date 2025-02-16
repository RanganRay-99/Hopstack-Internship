const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    ARAMEX_BASEURL: Joi.string().required(),
    ARAMEX_USERNAME: Joi.string().required(),
    ARAMEX_PASSWORD: Joi.string().required(),
    ARAMEX_ACCOUNT_NO: Joi.string().required(),
    ARAMEX_ACCOUNT_PIN: Joi.string().required(),
    ARAMEX_ACCOUNT_ENTITY: Joi.string().required(),
    ARAMEX_ACCOUNT_COUNTRY_CODE: Joi.string().required(),
    S3_BUCKET: Joi.string().required(),
    S3_USER_ACCESS_KEY_ID: Joi.string().required(),
    S3_USER_ACCESS_KEY: Joi.string().required(),
    S3_USER_REGION: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  aramex: {
    baseUrl: envVars.ARAMEX_BASEURL,
    username: envVars.ARAMEX_USERNAME,
    password: envVars.ARAMEX_PASSWORD,
    account: {
      number: envVars.ARAMEX_ACCOUNT_NO,
      pin: envVars.ARAMEX_ACCOUNT_PIN,
      entity: envVars.ARAMEX_ACCOUNT_ENTITY,
      countryCode: envVars.ARAMEX_ACCOUNT_COUNTRY_CODE,
    }
  },
  s3: {
    bucket: envVars.S3_BUCKET,
    accessKeyId: envVars.S3_USER_ACCESS_KEY_ID,
    secretAccessKey: envVars.S3_USER_ACCESS_KEY,
    region: envVars.S3_USER_REGION,
  }
}
