/**
 * Modifies the response from the Gravity Forms API to remove periods from keys and add a 'z' to the beginning of keys that start with a number.
 * If the value is an empty string, it will be converted to null.
 * If the value contains an object with all key that starts with a number, it will be converted to an array.
 * @param {Object} jsonObj
 * @returns {Object}
 */

const modifyResponse = (jsonObj) => {
  let updatedObj = {}
  let allNumeric = true

  for (let key in jsonObj) {
    // Check if all keys are numeric
    if (isNaN(parseInt(key))) {
      allNumeric = false
    }

    let newKey = key
    let newValue = jsonObj[key]

    if (key.includes('.')) {
      newKey = key.replace('.', '')
    }

    if (key.length > 0 && !isNaN(key.charAt(0))) {
      newKey = 'z' + newKey
    }

    if (Array.isArray(newValue)) {
      newValue = newValue.map((value) => {
        if (typeof value === 'object' && value !== null) {
          return modifyResponse(value)
        } else if (value === '') {
          return null
        } else {
          return value
        }
      })
    }

    if (typeof newValue === 'object' && newValue !== null && !Array.isArray(newValue)) {
      if (key === 'confirmations' || key === 'notifications') {
        newValue = Object.values(newValue).map((value) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return modifyResponse(value)
          }
          return value
        })
      } else {
        newValue = modifyResponse(newValue)
      }
    } else if (newValue === '') {
      newValue = null
    }

    updatedObj[newKey] = newValue
  }

  if (allNumeric) {
    return { forms: Object.values(updatedObj) }
  } else {
    return updatedObj
  }
}

module.exports = modifyResponse
