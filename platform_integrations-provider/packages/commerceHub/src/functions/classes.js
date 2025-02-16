const Joi = require('joi')

/**
 * Represents an File Path.
 * @class
 */
class FilePath {
  static validate(FilePath) {
    const schema = Joi.object({
      path: Joi.string().required(),
      marketplace: Joi.string().required(),
      file: Joi.string().required(),
    })

    return schema.validate(FilePath)
  }

  /**
   * Creates an instance of FilePath.
   * @param {object} FilePath - The instance for creating full path.
   * @param {String} FilePath.path Path for data which we are fetching
   * @param {String} FilePath.marketplace Marketplace for which we will fetch files, like jcpenny, walmart, bestbuy, etc.
   * @param {String} FilePath.file Filename which we want to fetch
   */
  constructor({ path, marketplace, file }) {
    const result = FilePath.validate({
      path,
      marketplace,
      file,
    })

    if (result.error) {
      const errorMessages = result.error.details.map((detail) => detail.message)
      throw new Error(`${errorMessages}`)
    }

    this.path = path
    this.marketplace = marketplace
    this.file = file
  }
}

module.exports = {
  FilePath,
}
