jest.mock('axios')
const axios = require('axios')
const listEntries = require('../entries/listEntries')

describe('listEntries', () => {
  const params = {
    baseUrl: 'https://example.com',
    customerKey: 'test',
    customerSecret: 'test',
  }
  it('returns entries when the request is successful', async () => {
    const mockData = {
      totalCount: 147,
      entries: [
        {
          z3: 'Isaiah',
          z5: 'Tanas',
          z6: 'azzilionarbitrage@gmail.com',
          z7: '(919) 353-0778',
          z8: 'Hello! My name is Isaiah Tanas, and i am currently looking for a prep center for my amazon FBA business. Are you currently accepting new clients?',
          id: '161',
          formId: '1',
          postId: null,
          dateCreated: '2023-05-22 13:33:24',
          dateUpdated: '2023-05-22 13:33:24',
          isStarred: '0',
          isRead: '0',
          ip: '174.247.6.42',
          sourceUrl: 'https://wasefulfillment.com/contact-us/',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
          currency: 'USD',
          paymentStatus: null,
          paymentDate: null,
          paymentAmount: null,
          paymentMethod: null,
          transactionId: null,
          isFulfilled: null,
          createdBy: null,
          transactionType: null,
          status: 'active',
        },
      ],
    }

    axios.mockResolvedValue({ data: mockData })

    const result = await listEntries(params)
    expect(Object.keys(result)).toEqual(Object.keys(mockData))
  })

  it('returns error when axios request fails', async () => {
    const errorMessage = 'Network Error'
    axios.mockRejectedValue(new Error(errorMessage))

    await expect(listEntries(params)).rejects.toThrow(errorMessage)
  })
})
