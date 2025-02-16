//Some fields like (cost, days, qty) that should return numbers are returned as string in inventory, so converting them to number
const typeConversionForInventoryFields = (data) => {
  return data.map((item) => {
    const convertedItem = { ...item }
    for (const key in convertedItem) {
      if (key.toLowerCase().includes('cost') || key.toLowerCase().includes('daystoship')) {
        const value = convertedItem[key]
        convertedItem[key] = value ? parseFloat(value) : null
      }
      if (key.toLowerCase().endsWith('qty')) {
        const value = convertedItem[key]
        convertedItem[key] = value ? parseFloat(value) : 0
      }
    }
    return convertedItem
  })
}
module.exports = typeConversionForInventoryFields
