const _ = require('lodash')
/**
 * @param {object} obj - The object to be processed for replacing underscore fields.
 * @returns {object} - The modified object with underscore, dollar fields replaced.
 */
const replaceSpecialCharactersInOrders = (obj) => {
  const underscore = '_'

  /**
   * Recursive helper function to replace underscore fields in an object.
   * @param {object} obj - The object to be processed for replacing underscore fields.
   * @returns {string|null} - The modified object with underscore fields replaced or null if no replacement occurred.
   */
  function replaceUnderscoreFields(obj) {
    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        // Process each item in the array
        obj[key].forEach(function (item) {
          if (item.hasOwnProperty(underscore)) {
            let val = item[underscore]
            item[key] = val
            delete item[underscore]
            return key
          }
          replaceUnderscoreFields(item) // Recursive call for nested objects in the array
        })
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Process nested object
        if (key.hasOwnProperty(underscore)) {
          let val = key[underscore]
          key[key] = val
          delete key[underscore]
          return key
        }
        replaceUnderscoreFields(obj[key]) // Recursive call for nested objects
      }
    }
    return null
  }

  /**
   * Recursive helper function to replace fields named '$' with 'attributes field.
   * This function is used to handle specific cases where a field is named '$', and its value is an object.
   * @param {object} obj - The object to be processed for replacing dollar fields.
   * @returns {object} - The modified object with fields named '$' replaced.
   */
  function replaceDollarFields(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null && key !== '$') {
        // Process nested objects or arrays
        if (Array.isArray(obj[key])) {
          obj[key].forEach(function (item) {
            replaceDollarFields(item) // Recursive call for nested objects in the array
          })
        } else {
          replaceDollarFields(obj[key]) // Recursive call for nested objects
        }
      } else if (key === '$') {
        // Replace fields named '$' with 'attributes
        const replacedKey = 'attributes'
        obj[replacedKey] = obj[key]
        delete obj[key]
      }
    }
  }

  /**
   * Recursively traverses the object and removes '-' from the field names, converting them to camelCase.
   * @param {Object} obj - The input object to process.
   * @returns {Object} - The modified object with '-' removed from the field names.
   */
  function removeDash(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Process nested objects or arrays
        if (Array.isArray(obj[key])) {
          obj[key].forEach(function (item) {
            removeDash(item) // Recursive call for nested objects in the array
          })
        } else {
          removeDash(obj[key]) // Recursive call for nested objects
        }
      }
      if (key.includes('-')) {
        let newKey = _.camelCase(key)
        obj[newKey] = obj[key]
        delete obj[key]
      }
    }
  }

  replaceUnderscoreFields(obj)
  replaceDollarFields(obj)
  removeDash(obj)
  return obj
}

module.exports = replaceSpecialCharactersInOrders

// Sample object, above code is to remove special characters from the object and adding meaning keys instead of them
// var data = {
//   "OrderMessageBatch": {
//     "$": {
//       "batchNumber": "18177797335"
//     },
//     "partnerID": [
//       {
//         "_": "delmarmfg",
//         "$": {
//           "name": "Delmar Mfg., LLC",
//           "roleType": "vendor"
//         }
//       }
//     ],
//     "hubOrder": [
//       {
//         "$": {
//           "transactionID": "3342486680"
//         },
//         "participatingParty": [
//           {
//             "_": "bestbuyca",
//             "$": {
//               "name": "Best Buy Canada",
//               "roleType": "merchant",
//               "participationCode": "From:"
//             }
//           }
//         ],
//         "sendersIdForReceiver": [
//           "54509"
//         ],
//         "orderId": [
//           "3342486680"
//         ],
//         "lineCount": [
//           "1"
//         ],
//         "poNumber": [
//           "56138633"
//         ],
//         "orderDate": [
//           "20230605"
//         ],
//         "merchandise": [
//           "74.00"
//         ],
//         "shipTo": [
//           {
//             "$": {
//               "personPlaceID": "PP6035947474"
//             }
//           }
//         ],
//         "invoiceTo": [
//           {
//             "$": {
//               "personPlaceID": "PP6035947475"
//             }
//           }
//         ],
//         "shippingCode": [
//           "UG"
//         ],
//         "salesDivision": [
//           "0898"
//         ],
//         "custOrderNumber": [
//           "1012395010"
//         ],
//         "custOrderDate": [
//           "20230605"
//         ],
//         "poHdrData": [
//           {
//             "reqShipDate": [
//               "20230605"
//             ],
//             "custOrderNumber": [
//               "1012395010"
//             ],
//             "custOrderDate": [
//               "20230605"
//             ],
//             "poTypeCode": [
//               "00"
//             ],
//             "offerCurrency": [
//               "CAD"
//             ]
//           }
//         ],
//         "lineItem": [
//           {
//             "lineItemId": [
//               "3389895266"
//             ],
//             "orderLineNumber": [
//               "1"
//             ],
//             "merchantLineNumber": [
//               "1"
//             ],
//             "qtyOrdered": [
//               "1"
//             ],
//             "unitOfMeasure": [
//               "EA"
//             ],
//             "UPC": [
//               "075000249698"
//             ],
//             "description": [
//               "AMOUR VDF 7500025491-7 PRL N DMOND RING"
//             ],
//             "description2": [
//               "EN"
//             ],
//             "merchantSKU": [
//               "10301166"
//             ],
//             "vendorSKU": [
//               "075000249698"
//             ],
//             "unitCost": [
//               "74.0000"
//             ],
//             "shippingCode": [
//               "UG"
//             ],
//             "poLineData": [
//               ""
//             ]
//           }
//         ],
//         "personPlace": [
//           {
//             "$": {
//               "personPlaceID": "PP6035947475"
//             },
//             "name1": [
//               "BEST BUY CANADA LTD"
//             ],
//             "address1": [
//               "102-425 W 6th AVE"
//             ],
//             "city": [
//               "VANCOUVER"
//             ],
//             "state": [
//               "BC"
//             ],
//             "country": [
//               "CAN"
//             ],
//             "postalCode": [
//               "V5Y 1L3"
//             ],
//             "partnerPersonPlaceId": [
//               "0000"
//             ]
//           },
//           {
//             "$": {
//               "personPlaceID": "PP6035947474"
//             },
//             "name1": [
//               "JANICE BASSETT"
//             ],
//             "address1": [
//               "1113 KESWICK CRT"
//             ],
//             "city": [
//               "OSHAWA"
//             ],
//             "state": [
//               "ON"
//             ],
//             "country": [
//               "CAN"
//             ],
//             "postalCode": [
//               "L1K2V2"
//             ],
//             "email": [
//               "jbasett@gmail.com"
//             ],
//             "dayPhone": [
//               "289-928-7618"
//             ],
//             "personPlaceData": [
//               {
//                 "attnLine": [
//                   "JANICE BASSETT"
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ],
//     "messageCount": [
//       "1"
//     ]
//   }
// };
