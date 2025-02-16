const { FilePath } = require('./functions/classes')
const parseCommerceHubInventoryFromExcelFile = require('./functions/parseCommerceHubInventoryFromExcelFile')
const parseCommerceHubInventoryFromTextFile = require('./functions/parseCommerceHubInventoryFromTextFile')
const parseCommerceHubOrdersFromXMLFile = require('./functions/parseCommerceHubOrdersFromXMLFile')
const Client = require('ssh2-sftp-client')
const Joi = require('joi')

/**
 * Represents client for CommerceHub Server.
 * @class
 */
class CommerceHubApi {
  static validate(serverCreds) {
    const schema = Joi.object({
      host: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      port: Joi.number().required(),
    })

    return schema.validate(serverCreds)
  }
  /**
   * Creates an instance of serverCreds.
   * @param {object} serverCreds - Host for the sFTP server.
   * @param {string} serverCreds.host - The host for server.
   * @param {string} serverCreds.username - The username for server.
   * @param {string} serverCreds.password - The password for server.
   * @param {Number} serverCreds.port - The port number.
   */
  constructor({ host, username, password, port }) {
    const result = CommerceHubApi.validate({
      host,
      username,
      password,
      port,
    })

    if (result.error) {
      const errorMessages = result.error.details.map((detail) => detail.message)
      throw new Error(`${errorMessages}`)
    }
    this.host = host
    this.username = username
    this.password = password
    this.port = port

    this.getOrders = this.getOrders.bind(this)
    this.getInventoryFromExcelFile = this.getInventoryFromExcelFile.bind(this)
    this.getInventoryFromTextFile = this.getInventoryFromTextFile.bind(this)
    this.listContentOfDirectory = this.listContentOfDirectory.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
  }

  async fetchAndParseFile(fullPath, callback) {
    const { host, username, password, port } = this
    const { path, marketplace, file } = new FilePath({ ...fullPath })

    const sftp = new Client()
    try {
      // Connect to the SFTP server
      await sftp.connect({
        host,
        username,
        password,
        port,
      })

      // Set the remote file path
      const remoteFilePath = `${path}/${marketplace}/${file}`

      const remoteFileContent = await sftp.get(remoteFilePath, undefined)
      // The `undefined` argument indicates that it should return the content as a Buffer

      // Call the specific callback function with the remote file content
      const result = await callback(remoteFileContent, marketplace, file)
      return result
    } catch (err) {
      let error = { err: err.stack, errData: JSON.stringify(err), fetched: false }
      return error
    } finally {
      sftp.end()
    }
  }

  // The specific functions
  async getOrders(fullPath) {
    return this.fetchAndParseFile(fullPath, parseCommerceHubOrdersFromXMLFile)
  }

  async getInventoryFromExcelFile(fullPath) {
    return this.fetchAndParseFile(fullPath, parseCommerceHubInventoryFromExcelFile)
  }

  async getInventoryFromTextFile(fullPath) {
    return this.fetchAndParseFile(fullPath, parseCommerceHubInventoryFromTextFile)
  }

  /**
   *It will fetch the list of content present in given directory
   * @param {FilePath} fullPath
   * @returns {Promise<object>} Response Object with list of sub folders/files
   * @throws {Error} If there is any error while fetching
   */
  async listContentOfDirectory(fullPath) {
    const { host, username, password, port } = this
    const { path, marketplace, file } = new FilePath({ ...fullPath })

    const sftp = new Client()
    try {
      // Connect to the SFTP server
      await sftp.connect({
        host,
        username,
        password,
        port,
      })

      const detailedList = await sftp.list(path)
      return detailedList
    } catch (err) {
      let error = { err: err.stack, errData: JSON.stringify(err), fetched: false }
      return error
    } finally {
      sftp.end()
    }
  }

  /**
   * It will delete the input file name having the given path from the server
   * @param {FilePath} fullPath
   * @returns {Promise<object>} Response Object with message
   * @throws {Error} If there is any error while deleting
   */
  async deleteFile(fullPath) {
    const { host, username, password, port } = this
    const { path, marketplace, file } = new FilePath({ ...fullPath })

    const sftp = new Client()
    try {
      // Connect to the SFTP server
      await sftp.connect({
        host,
        username,
        password,
        port,
      })

      const deleted = await sftp.delete(`${path}/${marketplace}/${file}`)
      let res = { message: deleted, deleted: true }
      return res
    } catch (err) {
      let error = { err: err.stack, errData: JSON.stringify(err), deleted: false }
      return error
    } finally {
      sftp.end()
    }
  }
}

module.exports = { CommerceHubApi, FilePath }
