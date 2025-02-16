const getFormByFormId = require('./getFormByFormId')
const requestHandler = require('../gravityFormsRequestHandler')
jest.mock('../gravityFormsRequestHandler')

describe('getFormByFormId', () => {
  const params = {
    formId: 1,
    baseUrl: 'https://example.com',
    customerKey: 'test',
    customerSecret: 'test',
  }
  it('should make a request with correct parameters', async () => {
    requestHandler.mockResolvedValue({})
    await getFormByFormId(params)

    expect(requestHandler).toHaveBeenCalledWith(
      'get',
      `/wp-json/gf/v2/forms/${params.formId}`,
      params.baseUrl,
      params.customerKey,
      params.customerSecret,
    )
  })

  it('should return a form object with the correct keys', async () => {
    const mockResponse = {
      title: 'Contact Us',
      id: 1,
    }
    requestHandler.mockResolvedValue(mockResponse)
    const result = await getFormByFormId(params)

    expect(Object.keys(result)).toEqual(expect.arrayContaining(Object.keys(mockResponse)))
  })

  it('should throw an error when requestHandler throws', async () => {
    requestHandler.mockImplementation(() => {
      throw new Error('Network Error')
    })

    await expect(getFormByFormId(params)).rejects.toThrow('Network Error')
  })
})
