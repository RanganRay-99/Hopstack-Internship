const { getSellingPartnerAPI } = require('@/utils')

const getReport = async (params) => {
  try {
    const { token, clientID, clientSecret, reportId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getReport',
      endpoint: 'reports',
      path: {
        reportId,
      },
      options: {
        version: '2021-06-30',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = getReport
