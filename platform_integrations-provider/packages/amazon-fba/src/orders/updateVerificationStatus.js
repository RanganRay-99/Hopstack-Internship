const { getSellingPartnerAPI } = require('@/utils')

const updateVerificationStatus = async (params) => {
  try {
    const { token, clientID, clientSecret, orderId, status, externalReviewerId, rejectionReasonId, region } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'updateVerificationStatus',
      endpoint: 'orders',
      body: {
        regulatedOrderVerificationStatus: {
          status,
          externalReviewerId,
          rejectionReasonId,
        },
      },
      path: {
        orderId: orderId,
      },
      options: {
        version: 'v0',
      },
    })
    return 'Success'
  } catch (err) {
    return err
  }
}

module.exports = updateVerificationStatus
