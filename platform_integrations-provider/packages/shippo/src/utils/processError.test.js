const processErrors = require('./processError')

describe('processErrors', () => {
  test('handles no error data', () => {
    const err = {
      response: {
        data: null,
      },
    }

    const result = processErrors(err)

    expect(result).toEqual([
      {
        message: "An error occurred, couldn't know error from shippo.",
        object: null,
        key: null,
      },
    ])
  })

  test('handles missing response data', () => {
    const err = {
      response: {},
    }

    const result = processErrors(err)

    expect(result).toEqual([
      {
        message: "An error occurred, couldn't know error from shippo.",
        object: null,
        key: null,
      },
    ])
  })

  test('handles nested error object with multiple fields and messages', () => {
    const err = {
      response: {
        data: {
          address_from: [
            {
              country: ['In order to create an Address, at least a country must be provided.'],
            },
          ],
          address_to: [
            {
              country: ['In order to create an Address, at least a country must be provided.'],
            },
          ],
        },
      },
    }

    const result = processErrors(err)

    expect(result).toEqual([
      {
        message: 'In order to create an Address, at least a country must be provided.',
        object: 'address_from',
        key: 'country',
      },
      {
        message: 'In order to create an Address, at least a country must be provided.',
        object: 'address_to',
        key: 'country',
      },
    ])
  })
})
