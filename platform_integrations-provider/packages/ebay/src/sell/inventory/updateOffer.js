const { getToken } = require('@/index')
const axios = require('axios').default


const updateSchedule = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, offerId,
        availableQuantity,
        categoryId,
        producerProductId,
          productPackageId,
          shipmentPackageId,
          productDocumentationId,
          currency,
          value,
          hideBuyerDetails,
          includeCatalogProductDetails,
          listingDescription,
          charityId,
          donationPercentage,
          bestOfferEnabled,
          eBayPlusIfEligible,
          fulfillmentPolicyId,
          paymentPolicyId,
         priority,
         takeBackPolicyId,
         listingStartDate,
        lotSize,
        marketplaceId,
        merchantLocationKey,
        quantityLimitPerBuyer,
        secondaryCategoryId,
        sku,
        returnPolicyId,
        applyTax,
          thirdPartyTaxCategory,
          vatPercentage,
          shippingServiceType
    } = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
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
            value
          }
        },
        format: [],
        hideBuyerDetails,
        includeCatalogProductDetails,
        listingDescription,
        listingDuration: [],
        litingPolicies: {
          bestOfferTerms: {
            autoAcceptPrice: {
              currency,
              value
            },
            autoDeclinePrice: {
              currency,
              value
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
              shippingServiceType,
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
        marketplaceId,
        merchantLocationKey,
        pricingSummary: {
          auctionReservePrice: {
            currency,
            value
          },
          auctionStartPrice: {
            currency,
            value
          },
          minimumAdvertisedPrice: {
            currency,
            value
          },
          originallySoldForRetailPriceOn:[],
          originalRetailPrice: {
            currency,
            value
          },
          price: {
            currency,
            value,
          },
          pricingVisibility:[]
        },
        quantityLimitPerBuyer,
        secondaryCategoryId,
        sku,
        storeCategoryNames: [
          
        ],
        tax: {
          applyTax,
          thirdPartyTaxCategory,
          vatPercentage
        }
      }
    const axiosConfig = {
      method: 'put',
      url: `https://api.ebay.com/sell/inventory/v1/offer/${offerId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
        
      },
      query: {
        offerId,
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = updateSchedule