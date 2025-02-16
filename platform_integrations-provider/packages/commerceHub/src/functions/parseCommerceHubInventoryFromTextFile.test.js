const parseCommerceHubInventoryFromTextFile = require('./parseCommerceHubInventoryFromTextFile')

describe('parseCommerceHubInventoryFromTextFile function', () => {
  it('should throw an error when no inventories are found', async () => {
    const remoteFileContent = ``

    const marketplace = 'MKT2'
    const file = 'empty_file.txt'

    await expect(parseCommerceHubInventoryFromTextFile(remoteFileContent, marketplace, file)).rejects.toThrowError(
      `Headers not found for marketplace: ${marketplace} in headers file`,
    )
  })
})
