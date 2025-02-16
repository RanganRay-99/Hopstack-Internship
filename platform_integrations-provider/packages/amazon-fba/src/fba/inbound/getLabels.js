const { getSellingPartnerAPI } = require('@/utils')

const getLabels = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      shipmentId,
      pageType,
      labelType,
      pageSize,
      numberOfPackages,
      packageLabelsToPrint,
      numberOfPallets,
      pageStartIndex,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getLabels',
      endpoint: 'fulfillmentInbound',
      path: {
        shipmentId: shipmentId,
      },
      query: {
        PageType: pageType || 'PackageLabel_Thermal', // Enum: https://developer-docs.amazon.com/sp-api/docs/fulfillment-inbound-api-v0-reference#pagetype
        LabelType: labelType || 'BARCODE_2D',
        NumberOfPackages: numberOfPackages,
        PackageLabelsToPrint: packageLabelsToPrint,
        NumberOfPallets: numberOfPallets,
        PageSize: pageSize,
        PageStartIndex: pageStartIndex,
      },
      options: {
        version: 'v0',
      },
    })
    return response
  } catch (err) {
    return err
  }
}

module.exports = getLabels
