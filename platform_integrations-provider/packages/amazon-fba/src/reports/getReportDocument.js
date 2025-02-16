const { getSellingPartnerAPI } = require('@/utils')
const { default: axios } = require('axios')
const parseReport = require('./parseReport')
const zlib = require('zlib')
const util = require('util')

/**
 * Decompresses a compressed data using gzip compression algorithm.
 *
 * @param {string} compressedData - The compressed data to decompress.
 * @returns {Promise<string>} - A Promise that resolves with the decompressed data as a string.
 * @throws {Error} - If there is an error during decompression.
 */
const decompressData = async (compressedData) => {
  const compressedBuffer = Buffer.from(compressedData, 'binary')

  return new Promise((resolve, reject) => {
    const compressedStream = new zlib.Gunzip()
    const chunks = []

    compressedStream.on('data', (chunk) => {
      chunks.push(chunk)
    })

    compressedStream.on('error', (error) => {
      reject(error)
    })

    compressedStream.on('end', () => {
      const decompressedData = Buffer.concat(chunks).toString()
      resolve(decompressedData)
    })

    compressedStream.end(compressedBuffer)
  })
}

/**
 * Retrieves a report document from the Selling Partner API.
 *
 * @param {Object} params - The parameters for retrieving the report document.
 * @param {string} params.token - The access token for authenticating the API request.
 * @param {string} params.clientID - The client ID for the Selling Partner API application.
 * @param {string} params.clientSecret - The client secret for the Selling Partner API application.
 * @param {string} params.reportDocumentId - The ID of the report document to retrieve.
 * @param {string} params.region - The AWS region for the Selling Partner API endpoint.
 * @returns {Promise<Object>} - A Promise that resolves with the retrieved report document.
 * @throws {Error} - If there is an error during the retrieval process.
 */
const getReportDocument = async (params) => {
  try {
    const { token, clientID, clientSecret, reportDocumentId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getReportDocument',
      endpoint: 'reports',
      path: {
        reportDocumentId,
      },
      options: {
        version: '2021-06-30',
      },
    })
    let res
    if (response?.compressionAlgorithm === 'GZIP') {
      // Handle compressed report document using gunzip
      res = await axios.get(response?.url, {
        responseType: 'arraybuffer',
      })

      res.data = await decompressData(res.data)

      console.log('getReportDocument | success with gunzip')
    } else {
      // Handle uncompressed report document
      res = await axios.get(response?.url)
    }

    if (!res.data || res.data === '') {
      throw new Error('getReportDocument | error while fetching report')
    }

    response.data = JSON.stringify(parseReport(res.data))
    return response
  } catch (err) {
    console.error('getReportDocument | error', err)
    return err
  }
}

module.exports = getReportDocument
