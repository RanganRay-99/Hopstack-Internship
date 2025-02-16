const { Address, Parcel, Shipment } = require('./classes')
const axios = require('axios').default
const qs = require('qs')

/**
 * Represents the EHUB API client.
 * @class
 */
class EHUBAPI {
  /**
   * Creates an instance of EHUBAPI.
   * @param {object} options - The options for configuring the EHUBAPI client.
   * @param {string} options.baseUrl - The base URL of the EHUB API.
   * @param {string} options.eHubToken - The authentication token for accessing the EHUB API.
   */
  constructor({ baseUrl, eHubToken }) {
    this.baseUrl = baseUrl
    this.eHubToken = eHubToken
  }

  /**
   * Returns the request headers with the necessary headers.
   * @returns {object} The request headers.
   */
  getRequestHeader() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.eHubToken}`,
    }
  }

  /**
   * Creates an EHUB shipment.
   * @param {object} options - The options for creating the EHUB shipment.
   * @param {Shipment} options.shipmentData - The shipment data.
   * @param {Parcel[]} options.parcels - The list of parcels.
   * @param {Address} options.toLocation - The destination address.
   * @param {Address} options.fromLocation - The origin address.
   * @returns {Promise<object>} A promise that resolves to the created shipment data or rejects with an error.
   */
  async createEhubShipment({ shipmentData, parcels, toLocation, fromLocation }) {
    try {
      const axiosConfig = {
        method: 'POST',
        url: `${this.baseUrl}/shipments/ship`,
        headers: {
          ...this.getRequestHeader(),
        },
        data: {
          shipment: {
            order_id: shipmentData.orderId,
            account_reference: shipmentData.accountReference,
            to_location: {
              company: toLocation.company,
              first_name: toLocation.firstName,
              last_name: toLocation.lastName,
              address1: toLocation.address1,
              address2: toLocation.address2,
              address3: toLocation.address3,
              city: toLocation.city,
              state: toLocation.state,
              country: toLocation.country,
              postal_code: toLocation.zip,
              phone: toLocation.phone,
              email: toLocation.email,
            },
            from_location: {
              company: fromLocation.company,
              first_name: fromLocation.firstName,
              last_name: fromLocation.lastName,
              address1: fromLocation.address1,
              address2: fromLocation.address2,
              address3: fromLocation.address3,
              city: fromLocation.city,
              state: fromLocation.state,
              country: fromLocation.country,
              postal_code: fromLocation.zip,
              phone: fromLocation.phone,
              email: fromLocation.email,
            },
            parcels: parcels.map((parcel) => ({
              length: parcel.length,
              width: parcel.width,
              height: parcel.height,
              weight: parcel.weight,
              package_type: parcel.packageType,
            })),
            service_id: shipmentData.serviceId,
            ship_date: shipmentData.shipDate,
            label_format: shipmentData.labelFormat,
            label_size: shipmentData.labelSize,
            label_text1: shipmentData.labelText1,
            label_text2: shipmentData.labelText2,
            label_scale: shipmentData.labelScale,
          },
        },
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  /**
   * Retrieves EHUB shipment rates.
   * @param {object} options - The options for retrieving EHUB shipment rates.
   * @param {Address} options.toLocation - The destination address.
   * @param {Address} options.fromLocation - The origin address.
   * @param {Parcel[]} options.parcels - The list of parcels.
   * @returns {Promise<object>} A promise that resolves to the shipment rates data or rejects with an error.
   */
  async getEhubShipmentRates({ toLocation, fromLocation, parcels }) {
    try {
      const axiosConfig = {
        method: 'POST',
        url: `${this.baseUrl}/rates`,
        headers: {
          ...this.getRequestHeader(),
        },
        data: {
          shipment: {
            to_location: {
              company: toLocation.company,
              first_name: toLocation.firstName,
              last_name: toLocation.lastName,
              address1: toLocation.address1,
              address2: toLocation.address2,
              address3: toLocation.address3,
              city: toLocation.city,
              state: toLocation.state,
              country: toLocation.country,
              postal_code: toLocation.zip,
              phone: toLocation.phone,
              email: toLocation.email,
            },
            from_location: {
              company: fromLocation.company,
              first_name: fromLocation.firstName,
              last_name: fromLocation.lastName,
              address1: fromLocation.address1,
              address2: fromLocation.address2,
              address3: fromLocation.address3,
              city: fromLocation.city,
              state: fromLocation.state,
              country: fromLocation.country,
              postal_code: fromLocation.zip,
              phone: fromLocation.phone,
              email: fromLocation.email,
            },
            parcels: parcels.map((parcel) => ({
              weight: parcel.weight,
            })),
          },
          show_all_services: false,
        },
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  /**
   * Retrieves EHUB shipping services.
   * @returns {Promise<object>} A promise that resolves to the shipping services data or rejects with an error.
   */
  async getEhubShippingServices() {
    try {
      const axiosConfig = {
        method: 'GET',
        url: `${this.baseUrl}/services`,
        headers: {
          ...this.getRequestHeader(),
        },
        params: {
          category: 'shipping',
        },
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  /**
   * Retrieves EHUB payment methods.
   * @returns {Promise<object>} A promise that resolves to the payment methods data or rejects with an error.
   */
  async getEhubPaymentMethods() {
    try {
      const axiosConfig = {
        method: 'GET',
        url: `${this.baseUrl}/payment_methods`,
        headers: {
          ...this.getRequestHeader(),
        },
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  /**
   * Validates an address using the ehub API.
   *
   * @async
   * @param {Object} options - The options for address validation.
   * @param {Object} options.address - The address to be validated.
   * @param {string} options.address.company - The company name (if applicable).
   * @param {string} options.address.firstName - The first name of the recipient.
   * @param {string} options.address.lastName - The last name of the recipient.
   * @param {string} options.address.address1 - The primary address line.
   * @param {string} [options.address.address2] - The secondary address line (optional).
   * @param {string} [options.address.address3] - The third address line (optional).
   * @param {string} options.address.city - The city of the address.
   * @param {string} options.address.state - The state or province of the address.
   * @param {string} options.address.country - The country of the address.
   * @param {string} options.address.zip - The postal code of the address.
   * @param {string} options.address.phone - The phone number associated with the address.
   * @param {string} options.address.email - The email address associated with the address.
   * @returns {Promise<Object>} A Promise that resolves to the validation response data.
   * @throws {Error} If there's an error during the validation process.
   */
  async ehubAddressValidator({ address }) {
    try {
      const axiosConfig = {
        method: 'GET',
        url: `${this.baseUrl}/shipping/validate_address`,
        headers: {
          ...this.getRequestHeader(),
        },
        params: {
          company: address.company,
          first_name: address.firstName,
          last_name: address.lastName,
          address1: address.address1,
          address2: address.address2,
          address3: address.address3,
          city: address.city,
          state: address.state,
          country: address.country,
          postal_code: address.zip,
          phone: address.phone,
          email: address.email,
        },
      }

      const response = await axios(axiosConfig)
      return {
        validate_address: {
          is_valid: response.data.validate_address.is_valid,
          address: {
            company: response.data.validate_address.address.company,
            first_name: response.data.validate_address.address.first_name,
            last_name: response.data.validate_address.address.last_name,
            nick_name: response.data.validate_address.address.nick_name,
            address1: response.data.validate_address.address.address1,
            address2: response.data.validate_address.address.address2,
            address3: response.data.validate_address.address.address3,
            city: response.data.validate_address.address.city,
            state: response.data.validate_address.address.state,
            country: response.data.validate_address.address.country,
            postal_code: response.data.validate_address.address.postal_code,
            phone: response.data.validate_address.address.phone,
            email: response.data.validate_address.address.email,
            residential: response.data.validate_address.address.residential,
          },
        },
      }
    } catch (err) {
      return {
        status: err.response.data.status,
        error_code: err.response.data.error_code,
        error_message: err.response.data.error_message,
      }
    }
  }
  /**
   * Deletes a shipment by sending a cancellation request to the server.
   * @async
   * @param {string} shipmentId - The ID of the shipment to be deleted.
   * @returns {Promise<Object>} A Promise that resolves to either the deleted shipment data or an error object.
   * @throws {Error} If there is an issue with the deletion process.
   */
  async voidShipment(shipmentId) {
    try {
      const axiosConfig = {
        method: 'PUT',
        url: `${this.baseUrl}/shipments/${shipmentId}/cancel`,
        headers: {
          ...this.getRequestHeader(),
        },
      }
      const response = await axios(axiosConfig)
      return
    } catch (err) {
      if (typeof err.response.data === 'string') {
        return {
          status: 'error',
          error_code: 'NOT FOUND',
          error_message: err.response.data,
        }
      }
      const errors = JSON.parse(err.response.data.error_message).errors.map((error) => {
        return {
          status: err.response.data.status,
          error_code: err.response.data.error_code,
          error_message: error,
        }
      })
      return { errors }
    }
  }

  async getEhubOrderStores() {
    try {
      const axiosConfig = {
        method: 'GET',
        url: `${this.baseUrl}/order_stores`,
        headers: {
          ...this.getRequestHeader(),
        },
        params: {},
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async getOrdersFromEhubOrderStore({ orderStoreId, page, perPage, status }) {
    try {
      const axiosConfig = {
        method: 'GET',
        url: `${this.baseUrl}/order_stores/${orderStoreId}/orders`,
        headers: {
          ...this.getRequestHeader(),
        },
        params: {
          page,
          per_page: perPage,
          status,
        },
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async getOrderFromEhubOrderStore({ orderStoreId, orderId }) {
    try {
      const axiosConfig = {
        method: 'GET',
        url: `${this.baseUrl}/order_stores/${orderStoreId}/orders/${orderId}`,
        headers: {
          ...this.getRequestHeader(),
        },
        params: {},
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async shipOrderFromEhubOrderStore({
    orderStoreId,
    orderId,
    shippingCost,
    shipDate,
    trackingNumber,
    carrier,
    service,
    notify,
  }) {
    let data = qs.stringify({
      shipping_cost: shippingCost,
      ship_date: shipDate,
      tracking_number: trackingNumber,
      carrier,
      service,
      notify,
    })
    try {
      const axiosConfig = {
        method: 'POST',
        url: `${this.baseUrl}/order_stores/${orderStoreId}/orders/${orderId}/shipment`,
        headers: {
          ...this.getRequestHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  async cancelEhubOrderShipment({ orderStoreId, orderId }) {
    try {
      const axiosConfig = {
        method: 'POST',
        url: `${this.baseUrl}/order_stores/${orderStoreId}/orders/${orderId}/shipments/cancel`,
        headers: {
          ...this.getRequestHeader(),
        },
        params: {},
      }

      const response = await axios(axiosConfig)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

module.exports = { EHUBAPI, Address, Parcel, Shipment }
