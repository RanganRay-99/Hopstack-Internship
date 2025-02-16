const XLSX = require('xlsx')
const parseCommerceHubInventoryFromExcelFile = require('./parseCommerceHubInventoryFromExcelFile')

// Sample test data
const sampleRemoteFileContent = 'sfsff'
const sampleMarketplace = 'Sample Marketplace'
const sampleFile = 'Sample File.xlsx'

describe('parseCommerceHubInventoryFromExcelFile', () => {
  test('should throw an error when no inventories are found in the Excel file', async () => {
    // Prepare a sample file without inventories
    const emptyFileContent = ''
    // XLSX.write([], { type: 'buffer' })

    // Ensure that the function throws an error with appropriate message
    await expect(
      parseCommerceHubInventoryFromExcelFile(emptyFileContent, sampleMarketplace, sampleFile),
    ).rejects.toThrowError(`No inventories found in the file ${sampleFile} in marketplace: ${sampleMarketplace}`)
  })
})
