const Joi = require('joi')

/**
 * Represents a shipment.
 * @class
 */
class Shipment {
  static validate(shipment) {
    const schema = Joi.object({
      orderId: Joi.string().allow(null).allow(""),
      accountReference: Joi.string().allow(null).allow(""),
      serviceId: Joi.number().strict(),
      labelFormat: Joi.string().allow(null),
      labelSize: Joi.string().allow(null),
      labelText1: Joi.string().allow(null).allow(""),
      labelText2: Joi.string().allow(null).allow(""),
    }).options({ abortEarly: false })

    return schema.validate(shipment)
  }

  /**
   * Creates an instance of Shipment.
   * @param {object} options - The options for creating the shipment.
   * @param {string} options.orderId - The ID of the order.
   * @param {string} options.accountReference - The account reference for the shipment.
   * @param {string} options.serviceId - The ID of the shipping service.
   * @param {string} options.shipDate - The shipping date.
   * @param {string} options.labelFormat - The label format for the shipment.
   * @param {string} options.labelSize - The label size for the shipment.
   * @param {string} options.labelText1 - The first line of text for the label.
   * @param {string} options.labelText2 - The second line of text for the label.
   * @param {number} options.labelScale - The scale for the label.
   */
  constructor({
    orderId,
    accountReference,
    serviceId,
    shipDate,
    labelFormat,
    labelSize,
    labelText1,
    labelText2,
    labelScale,
  }) {
    const result = Shipment.validate({
      orderId,
      accountReference,
      serviceId,
      labelFormat,
      labelSize,
      labelText1,
      labelText2,
    })

    if (result.error) {
      const errorMessages = result.error.details.map((detail) => detail.message)
      throw new Error(`Shipment ${errorMessages}`)
    }
    this.orderId = orderId
    this.accountReference = accountReference
    this.serviceId = serviceId
    this.shipDate = shipDate
    this.labelFormat = labelFormat
    this.labelSize = labelSize
    this.labelText1 = labelText1
    this.labelText2 = labelText2
    this.labelScale = labelScale
  }
}

/**
 * Represents an address.
 * @class
 */
class Address {
  static validate(address) {
    const schema = Joi.object({
      company: Joi.string().allow(null).allow(""),
      firstName: Joi.string().allow(null).allow(""),
      lastName: Joi.string().allow(null).allow(""),
      address1: Joi.string(),
      address2: Joi.string().allow(null).allow(""),
      address3: Joi.string().allow(null).allow(""),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      zip: Joi.string(),
      phone: Joi.string().allow(null).allow(""),
      email: Joi.string().allow(null).allow(""),
    }).options({ abortEarly: false })

    return schema.validate(address)
  }

  /**
   * Creates an instance of Address.
   * @param {object} options - The options for creating the address.
   * @param {string} options.company - The company name.
   * @param {string} options.firstName - The first name.
   * @param {string} options.lastName - The last name.
   * @param {string} options.address1 - The first line of the address.
   * @param {string} options.address2 - The second line of the address.
   * @param {string} options.address3 - The third line of the address.
   * @param {string} options.city - The city.
   * @param {string} options.state - The state.
   * @param {string} options.country - The country.
   * @param {string} options.zip - The postal code.
   * @param {string} options.phone - The phone number.
   * @param {string} options.email - The email address.
   */
  constructor({ company, firstName, lastName, address1, address2, address3, city, state, country, zip, phone, email }) {
    const result = Address.validate({
      company,
      firstName,
      lastName,
      address1,
      address2,
      address3,
      city,
      state,
      country,
      zip,
      phone,
      email,
    })

    if (result.error) {
      const errorMessages = result.error.details.map((detail) => detail.message)
      throw new Error(`Address ${errorMessages}`)
    }

    this.company = company
    this.firstName = firstName
    this.lastName = lastName
    this.address1 = address1
    this.address2 = address2
    this.address3 = address3
    this.city = city
    this.state = state
    this.country = country
    this.zip = zip
    this.phone = phone
    this.email = email
  }
}

/**
 * Represents a parcel.
 * @class
 */
class Parcel {
  static validate(parcel) {
    const schema = Joi.object({
      length: Joi.number().strict().required(),
      width: Joi.number().strict().required(),
      height: Joi.number().strict().required(),
      weight: Joi.number().strict().required(),
      packageType: Joi.string().allow(null).allow(""),
    }).options({ abortEarly: false })

    return schema.validate(parcel)
  }
  /**
   * Creates an instance of Parcel.
   * @param {object} options - The options for creating the parcel.
   * @param {number} options.length - The length of the parcel.
   * @param {number} options.width - The width of the parcel.
   * @param {number} options.height - The height of the parcel.
   * @param {number} options.weight - The weight of the parcel.
   * @param {string} options.packageType - The type of the parcel package.
   */
  constructor({ length, width, height, weight, packageType }) {
    const result = Parcel.validate({
      length,
      width,
      height,
      weight,
      packageType,
    })
    if (result.error) {
      const errorMessages = result.error.details.map((detail) => detail.message)
      throw new Error(`Parcel ${errorMessages}`)
    }
    this.length = length
    this.width = width
    this.height = height
    this.weight = weight
    this.packageType = packageType
  }
}

module.exports = {
  Shipment,
  Address,
  Parcel,
}
