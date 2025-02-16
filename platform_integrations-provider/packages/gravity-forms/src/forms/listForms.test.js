const listForms = require('./listForms')
const requestHandler = require('../gravityFormsRequestHandler')

jest.mock('../gravityFormsRequestHandler')

describe('listForms', () => {
  const params = {
    baseUrl: 'https://example.com',
    customerKey: 'test',
    customerSecret: 'test',
  }
  test('should return form list when successful', async () => {
    const expectedResponse = [
      { id: '1', title: 'Contact Us', entries: '100' },
      { id: '2', title: 'Sign Up', entries: '47' },
    ]

    requestHandler.mockResolvedValue(expectedResponse)

    const data = await listForms(params)

    expect(data).toEqual(expectedResponse)
    expect(requestHandler).toHaveBeenCalledWith(
      'get',
      '/wp-json/gf/v2/forms',
      params.baseUrl,
      params.customerKey,
      params.customerSecret,
    )

    expect(Object.keys(data)).toEqual(Object.keys(expectedResponse))
  })

  test('should throw error when request fails', async () => {
    requestHandler.mockRejectedValue(new Error('Network Error'))

    await expect(listForms(params)).rejects.toThrow('Network Error')
    expect(requestHandler).toHaveBeenCalledWith(
      'get',
      '/wp-json/gf/v2/forms',
      params.baseUrl,
      params.customerKey,
      params.customerSecret,
    )
  })
})
