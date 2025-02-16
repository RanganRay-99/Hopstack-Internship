const { getSellingPartnerAPI } = require('@/utils')
const { MarketPlaces } = require('@/config/constants')

const getOrders = async (params) => {
  try {
    const {
      token,
      clientID,
      clientSecret,
      createdAfter,
      createBefore,
      lastUpdatedAfter,
      lastUpdateBefore,
      orderStatuses,
      marketplaceCountryCode,
      fulfillmentChannels,
      paymentMethods,
      buyerEmail,
      sellerOrderId,
      maxResultsPerPage,
      easyShipShipmentStatuses,
      electronicInvoiceStatuses,
      nextToken,
      amazonOrderIds,
      actualFulfillmentSupplySourceId,
      isISPU,
      storeChainStoreId,
      region,
    } = params
    let sellingPartner = getSellingPartnerAPI(token, clientID, clientSecret, region)
    let response = await sellingPartner.callAPI({
      operation: 'getOrders',
      endpoint: 'orders',
      query: {
        CreatedAfter: createdAfter,
        CreatedBefore: createBefore,
        LastUpdatedAfter: lastUpdatedAfter,
        LastUpdatedBefore: lastUpdateBefore,
        OrderStatuses: orderStatuses,
        MarketplaceIds: [MarketPlaces[marketplaceCountryCode]],
        FulfillmentChannels: fulfillmentChannels,
        PaymentMethods: paymentMethods,
        BuyerEmail: buyerEmail,
        SellerOrderId: sellerOrderId,
        MaxResultsPerPage: maxResultsPerPage,
        EasyShipShipmentStatuses: easyShipShipmentStatuses,
        ElectronicInvoiceStatuses: electronicInvoiceStatuses,
        NextToken: nextToken,
        AmazonOrderIds: amazonOrderIds,
        ActualFulfillmentSupplySourceId: actualFulfillmentSupplySourceId,
        IsISPU: isISPU,
        StoreChainStoreId: storeChainStoreId,
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

module.exports = getOrders
