const typeConversionForInventoryFields = require('../utils/type-conversion-for-inventory-fields')
const headersObj = require('../utils/data-headers-for-inventory-text-files')
const _ = require('lodash')
const formatDate = require('../utils/format-date-in-orders-and-inventory')
const parseCommerceHubInventoryFromTextFile = async (remoteFileContent, marketplace, file) => {
  const rows = remoteFileContent.toString().split('\n')
  const data = rows.map((row) => {
    const cleanedRow = row.replace(/\r?\n/g, '')
    const columns = cleanedRow.trim().split(',')
    if (columns.length > 0 && columns[0] === '') {
      columns[0] = 'IN'
    }
    const processedColumns = columns.map((column) => {
      return column === '' ? null : column
    })
    return processedColumns
  })

  const mergedData = []

  for (let i = 0; i < data.length; i++) {
    const currentRow = data[i]

    if (i > 0 && currentRow[0] === 'WH') {
      let previousRow = mergedData[mergedData.length - 1]
      previousRow[previousRow.length - 1] = 'WH'
      currentRow.pop()
      mergedData[mergedData.length - 1] = previousRow.concat(currentRow.slice(1))
    } else {
      mergedData.push(currentRow)
    }
  }
  const headers = headersObj[marketplace]
  if (!headers) throw new Error(`Headers not found for marketplace: ${marketplace} in headers file`)
  const camelCaseHeaders = headers.map((header) => _.camelCase(header))
  let allInventories = mergedData.map((row) =>
    row.reduce((inventory, cell, i) => {
      inventory[camelCaseHeaders[i]] = cell
      return inventory
    }, {}),
  )
  let updatedInventories = typeConversionForInventoryFields(allInventories)
  let inventoriesPresent = false
  for (const inventories of updatedInventories) {
    if (inventories.hasOwnProperty('fileType') && inventories.fileType === 'IN') {
      inventoriesPresent = true
      break
    }
  }
  if (!inventoriesPresent) {
    throw new Error(`No inventories found in the file ${file} in marketplace: ${marketplace}`)
  }
  for (let i = 0; i < updatedInventories.length; i++) {
    if (Object.keys(updatedInventories[i]).length === 1) {
      updatedInventories.splice(i, 1)
      i--
    }
  }
  const formattedInventories = formatDate(updatedInventories)
  return formattedInventories
}
module.exports = parseCommerceHubInventoryFromTextFile
