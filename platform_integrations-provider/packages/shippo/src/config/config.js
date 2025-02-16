'use strict'

var dotenv = require('dotenv')

var path = require('path')

var Joi = require('joi')

dotenv.config({
  path: path.join(__dirname, '../../../../.env'),
})
var envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    SHIPPO_BASEURL: Joi.string().required(),
    SHIPPO_API_TOKEN: Joi.string().required(),
  })
  .unknown()
var { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env)

if (error) {
  throw new Error('Config validation error: '.concat(error.message))
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  shippo: {
    baseUrl: envVars.SHIPPO_BASEURL,
    apiToken: envVars.SHIPPO_API_TOKEN,
  },
}
//# sourceMappingURL=config.js.map
