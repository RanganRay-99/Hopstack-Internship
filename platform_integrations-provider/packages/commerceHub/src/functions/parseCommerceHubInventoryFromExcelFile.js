const XLSX = require('xlsx')
const _ = require('lodash')
const typeConversionForInventoryFields = require('../utils/type-conversion-for-inventory-fields')
const formatDate = require('../utils/format-date-in-orders-and-inventory')
const parseCommerceHubInventoryFromExcelFile = async (remoteFileContent, marketplace, file) => {
  const workbook = XLSX.read(remoteFileContent, { type: 'buffer' })
  // There is only one sheet in the excel file, so sheetIdx = 0. And for headerIdx = 1, the rowise data for sheet is returned
  const sheetIdx = 0,
    headerIdx = 1
  const sheetName = workbook.SheetNames[sheetIdx]
  const sheet = workbook.Sheets[sheetName]
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: headerIdx })
  let inventoriesPresent = false
  for (const row of jsonData) {
    if (row[0] === 'IN') {
      inventoriesPresent = true
      break
    }
  }
  if (!inventoriesPresent) throw new Error(`No inventories found in the file ${file} in marketplace: ${marketplace}`)
  const headerRowIdx = jsonData.findIndex((row) => row[0] === 'FILE TYPE') // the row index where headers are present
  if (headerRowIdx === -1) throw new Error(`No headers found for the excel file ${file} in marketplace: ${marketplace}`)
  const headers = jsonData[headerRowIdx]
  const camelCaseHeaders = headers.map((header) => _.camelCase(header))
  let updatedData = [],
    index = 0
  //Replacing undefined or empty fields with null for consistency
  for (const row of jsonData) {
    if (row[0] !== 'IN') continue
    updatedData.push([])
    for (const cell of row) {
      if (cell === undefined || cell === '' || typeof cell === 'undefined') {
        updatedData[index].push(null)
      } else {
        updatedData[index].push(cell)
      }
    }
    index++
  }
  let allInventories = updatedData.map((row) =>
    row.reduce((inventory, cell, i) => {
      inventory[camelCaseHeaders[i]] = cell
      return inventory
    }, {}),
  )
  let updatedInventories = typeConversionForInventoryFields(allInventories)
  const formattedInventories = formatDate(updatedInventories)
  return formattedInventories
}

module.exports = parseCommerceHubInventoryFromExcelFile
