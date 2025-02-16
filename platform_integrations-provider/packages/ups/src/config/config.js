const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    UPS_API_BASEURL: Joi.string().required(),
    UPS_ACCESS_KEY: Joi.string().required(),
    UPS_ACCOUNT_NUMBER: Joi.string().required(),
    UPS_PASSWORD: Joi.string().required(),
    UPS_USERID: Joi.string().required(),
    S3_BUCKET: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  ups: {
    baseUrl: envVars.UPS_API_BASEURL,
    accessKey: envVars.UPS_ACCESS_KEY,
    accountNumber: envVars.UPS_ACCOUNT_NUMBER,
    userId: envVars.UPS_USERID,
    password: envVars.UPS_PASSWORD,
  },
  aws: {
    s3Bucket: envVars.S3_BUCKET,
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    region: envVars.AWS_REGION,
  },
}
