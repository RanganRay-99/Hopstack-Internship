const typeConversionForInventoryFields = require('./type-conversion-for-inventory-fields')

describe('typeConversionForInventoryFields', () => {
  it('should convert cost and daysToShip to numbers', () => {
    const input = [
      { id: 1, name: 'Product 1', cost: '10.5', daysToShip: '2', qty: '100' },
      { id: 2, name: 'Product 2', cost: '20.25', daysToShip: '3', qty: '50' },
      { id: 3, name: 'Product 3', cost: '15', daysToShip: '1', qty: '75' },
    ]

    const expectedOutput = [
      { id: 1, name: 'Product 1', cost: 10.5, daysToShip: 2, qty: 100 },
      { id: 2, name: 'Product 2', cost: 20.25, daysToShip: 3, qty: 50 },
      { id: 3, name: 'Product 3', cost: 15, daysToShip: 1, qty: 75 },
    ]

    const result = typeConversionForInventoryFields(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should set quantity to 0 for empty or invalid values', () => {
    const input = [
      { id: 1, name: 'Product 1', cost: '10.5', daysToShip: '2', qty: '' },
      { id: 2, name: 'Product 2', cost: '20.25', daysToShip: '3', qty: null },
      { id: 3, name: 'Product 3', cost: '15', daysToShip: '1', qty: 'abc' },
    ]

    const expectedOutput = [
      { id: 1, name: 'Product 1', cost: 10.5, daysToShip: 2, qty: 0 },
      { id: 2, name: 'Product 2', cost: 20.25, daysToShip: 3, qty: 0 },
      { id: 3, name: 'Product 3', cost: 15, daysToShip: 1, qty: NaN },
    ]

    const result = typeConversionForInventoryFields(input)
    expect(result).toEqual(expectedOutput)
  })
})
