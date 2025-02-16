const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    WOOCOMMERCE_SHOP_URL: Joi.string().required(),
    WOOCOMMERCE_CONSUMER_KEY: Joi.string().required(),
    WOOCOMMERCE_CONSUMER_SECRET: Joi.string().required(),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  wooCommerce: {
    shopUrl: envVars.WOOCOMMERCE_SHOP_URL,
    consumerSecret: envVars.WOOCOMMERCE_CONSUMER_SECRET,
    consumerKey: envVars.WOOCOMMERCE_CONSUMER_KEY,
  },
}