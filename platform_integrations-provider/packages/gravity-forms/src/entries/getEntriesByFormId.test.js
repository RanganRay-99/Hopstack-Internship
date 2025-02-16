const axios = require('axios')
const getEntriesByFormId = require('./getEntriesByFormId')

jest.mock('axios')

describe('getEntriesByFormId', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const params = {
    formId: 2,
    baseUrl: 'https://example.com',
    customerKey: 'test',
    customerSecret: 'test',
  }
  it('should return data when axios gets data successfully', async () => {
    const data = {
      totalCount: 1,
      entries: [
        {
          id: '1',
          formId: '2',
        },
      ],
    }
    axios.mockResolvedValue({ data })

    const result = await getEntriesByFormId(params)

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: expect.any(String),
        url: expect.any(String),
      }),
    )
    expect(result).toEqual(data)
  })

  test('returns error when axios request fails', async () => {
    const errorMessage = 'Network Error'
    axios.mockRejectedValue(new Error(errorMessage))

    await expect(getEntriesByFormId(params)).rejects.toThrow(errorMessage)
  })

  it('should throw error when formId is not provided', async () => {
    const params = {}
    await expect(getEntriesByFormId(params)).rejects.toThrow('formId is required')

    expect(axios).not.toHaveBeenCalled()
  })
})
