const { getToken } = require('@/index')

const axios = require('axios').default



const bulkMigrateListing = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, availableQuantity, categoryId, charityId, donationPercentage, producerProductId,
    productPackageId, shipmentPackageId, productDocumentationId, currency, value,hideBuyerDetails, includeCatalogProductDetail, listingDescription,
    bestOfferEnabled,
    eBayPlusIfEligible,
    fulfillmentPolicyId,
    paymentPolicyId,
    returnPolicyId,
    priority,
    takeBackPolicyId,
    listingStartDate,
    lotSize,
    merchantLocationKey,
    pricingVisibility,
    quantityLimitPerBuyer,
    secondaryCategoryId,
    sku,
    applyTax,
    thirdPartyTaxCategory,
    vatPercentage,} = params
    
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        requests: [
          {
            availableQuantity,
            categoryId,
            charity: {
              charityId,
              donationPercentage,
            },
            extendedProducerResponsibility: {
              producerProductId,
              productPackageId,
              shipmentPackageId,
              productDocumentationId,
              ecoParticipationFee: {
                currency,
                value,
              }
            },
            format: [],
            hideBuyerDetails,
            includeCatalogProductDetail,
            listingDescription,
            listingDuration:[],
            listingPolicies: {
              bestOfferTerms: {
                autoAcceptPrice: {
                  currency,
                  value,
                },
                autoDeclinePrice: {
                  currency,
                  value,
                },
                bestOfferEnabled,
              },
              eBayPlusIfEligible,
              fulfillmentPolicyId,
              paymentPolicyId,
              productCompliancePolicyIds: [
                
              ],
              returnPolicyId,
              shippingCostOverrides: [
                {
                  additionalShippingCost: {
                    currency,
                    value
                  },
                  priority,
                  shippingCost: {
                    currency,
                    value
                  },
                  shippingServiceType:[],
                  surcharge: {
                    currency,
                    value
                  }
                }
              ],
              takeBackPolicyId,
            },
            listingStartDate,
            lotSize,
            marketplaceId:[],
            merchantLocationKey,
            pricingSummary: {
             auctionReservePrice: {
                currency,
                value,
              },
              auctionStartPrice: {
                currency,
                value,
              },
              minimumAdvertisedPrice: {
                currency,
                value,
              },
              OriginallySoldForRetailPriceOn: [],
              originalRetailPrice: {
                currency,
                value
              },
              price: {
                currency,
                value,
              },
              pricingVisibility,
            },
            quantityLimitPerBuyer,
            secondaryCategoryId,
            sku,
            storeCategoryNames: [
              
            ],
            tax: {
              applyTax,
              thirdPartyTaxCategory,
              vatPercentage,
            }
          }
        ]
      }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/inventory/v1/bulk_create_offer`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
        
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = bulkMigrateListing