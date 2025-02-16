const moment = require('moment')
const dateFormats = ['YYYYMMDD', 'DD/MM/YYYY', moment.ISO_8601]

function convertToYYYYMMDD(dateString) {
  const parsedDate = moment(dateString, dateFormats, true)
  const formattedDate = parsedDate.format('YYYY-MM-DD')
  return formattedDate
}

/**
 * @param {object[]|object} fileData - The array of objects representing the file data to be formatted.
 * @returns {object[]|object} The formatted file data with date fields in "YYYY-MM-DD" format.
 */
function formatDate(fileData) {
  //If the data is an inventory file
  if (fileData[0]?.fileType && fileData[0].fileType === 'IN') {
    for (let product of fileData) {
      if (product?.nextAvailableDate) product.nextAvailableDate = convertToYYYYMMDD(product.nextAvailableDate)
      if (product?.discontinuedDate) product.discontinuedDate = convertToYYYYMMDD(product.discontinuedDate)
      if (product?.availabilityStartDate) product.availabilityStartDate = convertToYYYYMMDD(product.availabilityStartDate)
      if (product?.availabilityEndDate) product.availabilityEndDate = convertToYYYYMMDD(product.availabilityEndDate)
    }
  }
  //If the data is an order file object
  else {
    for (let order of fileData.OrderMessageBatch.hubOrder) {
      if (order?.orderDate[0]) order.orderDate[0] = convertToYYYYMMDD(order.orderDate[0])
      if (order?.custOrderDate) order.custOrderDate[0] = convertToYYYYMMDD(order.custOrderDate[0])
    }
  }
  return fileData
}
module.exports = formatDate
