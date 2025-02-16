const parseCommerceHubOrdersFromXMLFile = require('./parseCommerceHubOrdersFromXMLFile')

describe('parseCommerceHubOrdersFromXMLFile function', () => {
  test('should throw an error when parsing XML file fails', async () => {
    const remoteFileContent = ''

    const marketplace = 'MKT2'
    const file = 'invalid_file.xml'

    await expect(parseCommerceHubOrdersFromXMLFile(remoteFileContent, marketplace, file)).rejects.toThrowError(
      `No order data available`,
    )
  })
})
