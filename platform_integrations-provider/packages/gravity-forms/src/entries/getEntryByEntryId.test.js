jest.mock('axios')
const axios = require('axios')
const getEntryByEntryId = require('./getEntryByEntryId')

describe('getEntryByEntryId', () => {
  const params = {
    entryId: 1,
    baseUrl: 'https://example.com',
    customerKey: 'test',
    customerSecret: 'test',
  }

  it('returns entry when the request is successful', async () => {
    const mockData = {
      z3: 'value',
      z5: 'value',
      z6: 'value',
      z7: 'value',
      z8: 'value',
      id: 'value',
      formId: 'value',
      postId: 'value',
      dateCreated: 'value',
      dateUpdated: 'value',
      isStarred: 'value',
      isRead: 'value',
      ip: 'value',
      sourceUrl: 'value',
      userAgent: 'value',
      currency: 'value',
      paymentStatus: 'value',
      paymentDate: 'value',
      paymentAmount: 'value',
      paymentMethod: 'value',
      transactionId: 'value',
      isFulfilled: 'value',
      createdBy: 'value',
      transactionType: 'value',
      status: 'value',
    }
    axios.mockResolvedValue({ data: mockData })

    const result = await getEntryByEntryId(params)
    expect(result).toEqual(expect.objectContaining(mockData))
  })

  it('throws error when entryId is not provided', async () => {
    await expect(getEntryByEntryId({})).rejects.toThrow()
  })

  it('returns error when axios request fails', async () => {
    const errorMessage = 'Network Error'
    axios.mockRejectedValue(new Error(errorMessage))

    await expect(getEntryByEntryId(params)).rejects.toThrow(errorMessage)
  })
})
