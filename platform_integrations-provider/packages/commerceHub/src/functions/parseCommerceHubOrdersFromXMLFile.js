const { parseString, parseStringPromise } = require('xml2js')
const xml2js = require('xml2js')
const formatDate = require('../utils/format-date-in-orders-and-inventory')
const replaceSpecialCharactersInOrders = require('../utils/replace-special-characters-in-orders')
const parseCommerceHubOrdersFromXMLFile = async (remoteFileContent, marketplace, file) => {
  let fileContentString = remoteFileContent.toString('utf8')
  let data = null,
    jsonString = null,
    jsObject = null,
    finalJsonObject = null,
    formattedObject = null
  data = await xml2js
    .parseStringPromise(fileContentString)
    .then((result) => result)
    .catch((err) => {
      throw new Error(`Error in parsing XML file: ${err} for file: ${file} in marketplace: ${marketplace}`)
    })
  if (!data) throw new Error(`No order data available`)
  const spacing = 2
  jsonString = JSON.stringify(data, null, spacing)
  jsObject = JSON.parse(jsonString)
  formattedObject = formatDate(jsObject)
  finalJsonObject = replaceSpecialCharactersInOrders(formattedObject)
  return finalJsonObject
}

module.exports = parseCommerceHubOrdersFromXMLFile
