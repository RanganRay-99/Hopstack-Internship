// const moment = require('moment')
// const formatDate = require('./format-date-in-orders-and-inventory')

// // Mock the moment library to avoid actual date parsing
// jest.mock('moment')

// describe('formatDate', () => {
//   afterEach(() => {
//     // Restore the original moment behavior after each test
//     jest.restoreAllMocks()
//   })

//   test('should format inventory file data correctly', () => {
//     const fileData = [
//       {
//         fileType: 'IN',
//         nextAvailableDate: '20230101',
//         discontinuedDate: '31/12/2022', // Invalid format
//         availabilityStartDate: '2022-01-01',
//         availabilityEndDate: null, // null value
//       },
//       {
//         fileType: 'IN',
//         nextAvailableDate: '20220101',
//       },
//     ]

//     const formattedData = formatDate(fileData)

//     expect(formattedData).toEqual([
//       {
//         fileType: 'IN',
//         nextAvailableDate: '2023-01-01', // Formatted to 'YYYY-MM-DD'
//         discontinuedDate: 'Invalid date format', // Invalid format, not formatted
//         availabilityStartDate: '2022-01-01', // Formatted to 'YYYY-MM-DD'
//         availabilityEndDate: 'Invalid date format', // null value, not formatted
//       },
//       {
//         fileType: 'IN',
//         nextAvailableDate: '2022-01-01', // Formatted to 'YYYY-MM-DD'
//       },
//     ])
//   })

//   test('should format order file data correctly', () => {
//     const fileData = {
//       OrderMessageBatch: {
//         hubOrder: [
//           {
//             orderDate: ['2023-01-01'],
//             custOrderDate: ['2022/12/31'], // Invalid format
//           },
//           {
//             orderDate: ['2022-01-01'],
//           },
//         ],
//       },
//     }

//     const formattedData = formatDate(fileData)

//     expect(formattedData).toEqual({
//       OrderMessageBatch: {
//         hubOrder: [
//           {
//             orderDate: ['2023-01-01'], // Formatted to 'YYYY-MM-DD'
//             custOrderDate: ['Invalid date format'], // Invalid format, not formatted
//           },
//           {
//             orderDate: ['2022-01-01'], // Formatted to 'YYYY-MM-DD'
//           },
//         ],
//       },
//     })
//   })
// })

const formatDate = require('./format-date-in-orders-and-inventory')

describe('formatDate function', () => {
  it('should format inventory date fields to "YYYY-MM-DD" format', () => {
    const input = [
      {
        fileType: 'IN',
        nextAvailableDate: '31/12/2022',
        discontinuedDate: null,
        availabilityStartDate: '2022-01-01',
        availabilityEndDate: '2022-02-01',
      },
    ]

    const expectedOutput = [
      {
        fileType: 'IN',
        nextAvailableDate: '2022-12-31',
        discontinuedDate: null,
        availabilityStartDate: '2022-01-01',
        availabilityEndDate: '2022-02-01',
      },
    ]

    const result = formatDate(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should format order date fields to "YYYY-MM-DD" format', () => {
    const input = {
      OrderMessageBatch: {
        hubOrder: [
          {
            orderDate: ['31/12/2022'],
            custOrderDate: ['2022-01-01'],
          },
        ],
      },
    }

    const expectedOutput = {
      OrderMessageBatch: {
        hubOrder: [
          {
            orderDate: ['2022-12-31'],
            custOrderDate: ['2022-01-01'],
          },
        ],
      },
    }

    const result = formatDate(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should return Invalid date for wrong input in inventory', () => {
    const input = [
      {
        fileType: 'IN',
        nextAvailableDate: '31/12/2022',
        discontinuedDate: null,
        availabilityStartDate: '202221/01',
        availabilityEndDate: 'undefined',
      },
    ]

    const expectedOutput = [
      {
        fileType: 'IN',
        nextAvailableDate: '2022-12-31',
        discontinuedDate: null,
        availabilityStartDate: 'Invalid date',
        availabilityEndDate: 'Invalid date',
      },
    ]

    const result = formatDate(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should return Invalid date for wrong input in order', () => {
    const input = {
      OrderMessageBatch: {
        hubOrder: [
          {
            orderDate: ['0000000'],
            custOrderDate: ['23232323'],
          },
        ],
      },
    }

    const expectedOutput = {
      OrderMessageBatch: {
        hubOrder: [
          {
            orderDate: ['Invalid date'],
            custOrderDate: ['Invalid date'],
          },
        ],
      },
    }

    const result = formatDate(input)
    expect(result).toEqual(expectedOutput)
  })
})
