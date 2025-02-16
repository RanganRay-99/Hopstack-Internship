const axios = require('axios').default
const config = require('@/config/config')
const getToken = require('../config/auth')

let FEDEX_ACCOUNT_NUMBER = config.FEDEX_ACCOUNT_NUMBER
let FEDEX_API_BASEURL = config.FEDEX_API_BASEURL

const createShipment = async (params) => {
  try {
    const { clientId, secretKey, totalDeclaredValue, sender, receiver, shipment, masterTrackingId, invoiceNumber, accountNumber, apiBaseURL } = params
    const token = getToken(apiBaseURL, clientId, secretKey)
    FEDEX_ACCOUNT_NUMBER = accountNumber || FEDEX_ACCOUNT_NUMBER
    FEDEX_API_BASEURL = apiBaseURL || FEDEX_API_BASEURL

    const data = {
      mergeLabelDocOption: 'LABELS_AND_DOCS',
      requestedShipment: {
        shipDatestamp: new Date().toJSON().slice(0, 10),
        totalDeclaredValue: {
          amount: totalDeclaredValue.amount,
          currency: totalDeclaredValue.currency,
        },
        shipper: {
          address: {
            streetLines: sender.address.streetLines,
            city: sender.address.city,
            stateOrProvinceCode: sender.address.stateOrProvinceCode,
            postalCode: sender.address.postalCode,
            countryCode: sender.address.countryCode,
            residential: false,
          },
          contact: {
            personName: sender.contact.personName,
            emailAddress: sender.contact.emailAddress,
            phoneExtension: sender.contact.phoneExtension,
            phoneNumber: sender.contact.phoneNumber,
            companyName: sender.contact.companyName,
          },
          tins: [
            {
              number: sender.taxIdentificationNumber.id,
              tinType: sender.taxIdentificationNumber.type,
              usage: sender.taxIdentificationNumber.usage,
              effectiveDate: new Date(sender.taxIdentificationNumber.effectiveDate),
              expirationDate: new Date(sender.taxIdentificationNumber.expirationDate),
            },
          ],
        },
        recipients: [
          {
            address: {
              streetLines: receiver.address.streetLines,
              city: receiver.address.city,
              stateOrProvinceCode: receiver.address.stateOrProvinceCode,
              postalCode: receiver.address.postalCode,
              countryCode: receiver.address.countryCode,
              residential: false,
            },
            contact: {
              personName: receiver.contact.personName,
              emailAddress: receiver.contact.emailAddress,
              phoneExtension: receiver.contact.phoneExtension,
              phoneNumber: receiver.contact.phoneNumber,
              companyName: receiver.contact.companyName,
            },
            tins: [
              {
                number: receiver.taxIdentificationNumber.id,
                tinType: receiver.taxIdentificationNumber.type,
                usage: receiver.taxIdentificationNumber.usage,
                effectiveDate: new Date(receiver.taxIdentificationNumber.effectiveDate),
                expirationDate: new Date(receiver.taxIdentificationNumber.expirationDate),
              },
            ],
            deliveryInstructions: receiver.deliveryInstructions,
          },
        ],
        recipientLocationNumber: receiver.locationNumber,
        pickupType: 'USE_SCHEDULED_PICKUP',
        serviceType: 'PRIORITY_OVERNIGHT',
        packagingType: 'YOUR_PACKAGING',
        totalWeight: shipment.weight,
        origin: {
          address: {
            streetLines: sender.address.streetLines,
            city: sender.address.city,
            stateOrProvinceCode: sender.address.stateOrProvinceCode,
            postalCode: sender.address.postalCode,
            countryCode: sender.address.countryCode,
            residential: false,
          },
          contact: {
            personName: sender.contact.personName,
            emailAddress: sender.contact.emailAddress,
            phoneExtension: sender.contact.phoneExtension,
            phoneNumber: sender.contact.phoneNumber,
            companyName: sender.contact.companyName,
          },
        },
        shippingChargesPayment: {
          paymentType: 'SENDER',
          payor: {
            responsibleParty: {
              address: {
                streetLines: sender.address.streetLines,
                city: sender.address.city,
                stateOrProvinceCode: sender.address.stateOrProvinceCode,
                postalCode: sender.address.postalCode,
                countryCode: sender.address.countryCode,
                residential: false,
              },
              contact: {
                personName: sender.contact.personName,
                emailAddress: sender.contact.emailAddress,
                // parsedPersonName: {
                //   firstName: "first name",
                //   lastName: "last name",
                //   middleName: "middle name",
                //   suffix: "suffix",
                // },
                phoneNumber: sender.contact.phoneNumber,
                phoneExtension: sender.contact.phoneExtension,
                companyName: sender.contact.companyName,
                faxNumber: sender.contact.faxNumber,
              },
              accountNumber: {
                value: FEDEX_ACCOUNT_NUMBER,
              },
            },
          },
        },
        // shipmentSpecialServices: {
        //   specialServiceTypes: [
        //     "THIRD_PARTY_CONSIGNEE",
        //     "PROTECTION_FROM_FREEZING",
        //   ],
        //   etdDetail: {
        //     attributes: ["POST_SHIPMENT_UPLOAD_REQUESTED"],
        //     attachedDocuments: [
        //       {
        //         documentType: "PRO_FORMA_INVOICE",
        //         documentReference: "DocumentReference",
        //         description: "PRO FORMA INVOICE",
        //         documentId: "090927d680038c61",
        //       },
        //     ],
        //     requestedDocumentTypes: [
        //       "VICS_BILL_OF_LADING",
        //       "GENERAL_AGENCY_AGREEMENT",
        //     ],
        //   },
        //   returnShipmentDetail: {
        //     returnEmailDetail: {
        //       merchantPhoneNumber: "19012635656",
        //       allowedSpecialService: ["SATURDAY_DELIVERY"],
        //     },
        //     rma: {
        //       reason: "Wrong Size or Color",
        //     },
        //     returnAssociationDetail: {
        //       shipDatestamp: "2019-10-01",
        //       trackingNumber: "123456789",
        //     },
        //     returnType: "PRINT_RETURN_LABEL",
        //   },
        //   deliveryOnInvoiceAcceptanceDetail: {
        //     recipient: {
        //       address: {
        //         streetLines: ["23, RUE JOSEPH-DE MA", "Suite 302"],
        //         city: "Beverly Hills",
        //         stateOrProvinceCode: "CA",
        //         postalCode: "90210",
        //         countryCode: "US",
        //         residential: false,
        //       },
        //       contact: {
        //         personName: "John Taylor",
        //         emailAddress: "sample@company.com",
        //         phoneExtension: "000",
        //         phoneNumber: "1234567890",
        //         companyName: "Fedex",
        //       },
        //       tins: [
        //         {
        //           number: "123567",
        //           tinType: "FEDERAL",
        //           usage: "usage",
        //           effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //           expirationDate: "2000-01-23T04:56:07.000+00:00",
        //         },
        //       ],
        //       deliveryInstructions: "Delivery Instructions",
        //     },
        //   },
        //   internationalTrafficInArmsRegulationsDetail: {
        //     licenseOrExemptionNumber: "9871234",
        //   },
        //   pendingShipmentDetail: {
        //     pendingShipmentType: "EMAIL",
        //     processingOptions: {
        //       options: ["ALLOW_MODIFICATIONS"],
        //     },
        //     recommendedDocumentSpecification: {
        //       types: "ANTIQUE_STATEMENT_EUROPEAN_UNION",
        //     },
        //     emailLabelDetail: {
        //       recipients: [
        //         {
        //           emailAddress: "neena@fedex.com",
        //           optionsRequested: {
        //             options: [
        //               "PRODUCE_PAPERLESS_SHIPPING_FORMAT",
        //               "SUPPRESS_ACCESS_EMAILS",
        //             ],
        //           },
        //           role: "SHIPMENT_COMPLETOR",
        //           locale: "en_US",
        //         },
        //       ],
        //       message: "your optional message",
        //     },
        //     attachedDocuments: [
        //       {
        //         documentType: "PRO_FORMA_INVOICE",
        //         documentReference: "DocumentReference",
        //         description: "PRO FORMA INVOICE",
        //         documentId: "090927d680038c61",
        //       },
        //     ],
        //     expirationTimeStamp: "2020-01-01",
        //   },
        //   holdAtLocationDetail: {
        //     locationId: "YBZA",
        //     locationContactAndAddress: {
        //       address: {
        //         streetLines: ["10 FedEx Parkway", "Suite 302"],
        //         city: "Beverly Hills",
        //         stateOrProvinceCode: "CA",
        //         postalCode: "38127",
        //         countryCode: "US",
        //         residential: false,
        //       },
        //       contact: {
        //         personName: "person name",
        //         emailAddress: "email address",
        //         parsedPersonName: {
        //           firstName: "first name",
        //           lastName: "last name",
        //           middleName: "middle name",
        //           suffix: "suffix",
        //         },
        //         phoneNumber: "phone number",
        //         phoneExtension: "phone extension",
        //         companyName: "company name",
        //         faxNumber: "fax number",
        //       },
        //     },
        //     locationType: "FEDEX_ONSITE",
        //   },
        //   shipmentCODDetail: {
        //     addTransportationChargesDetail: {
        //       rateType: "ACCOUNT",
        //       rateLevelType: "BUNDLED_RATE",
        //       chargeLevelType: "CURRENT_PACKAGE",
        //       chargeType: "COD_SURCHARGE",
        //     },
        //     codRecipient: {
        //       address: {
        //         streetLines: ["10 FedEx Parkway", "Suite 302"],
        //         city: "Beverly Hills",
        //         stateOrProvinceCode: "CA",
        //         postalCode: "90210",
        //         countryCode: "US",
        //         residential: false,
        //       },
        //       contact: {
        //         personName: "John Taylor",
        //         emailAddress: "sample@company.com",
        //         phoneExtension: "000",
        //         phoneNumber: "XXXX345671",
        //         companyName: "Fedex",
        //       },
        //       accountNumber: {
        //         value: "Your account number",
        //       },
        //       tins: [
        //         {
        //           number: "123567",
        //           tinType: "FEDERAL",
        //           usage: "usage",
        //           effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //           expirationDate: "2000-01-23T04:56:07.000+00:00",
        //         },
        //       ],
        //     },
        //     remitToName: "remitToName",
        //     codCollectionType: "ANY",
        //     financialInstitutionContactAndAddress: {
        //       address: {
        //         streetLines: ["10 FedEx Parkway", "Suite 302"],
        //         city: "Beverly Hills",
        //         stateOrProvinceCode: "CA",
        //         postalCode: "38127",
        //         countryCode: "US",
        //         residential: false,
        //       },
        //       contact: {
        //         personName: "person name",
        //         emailAddress: "email address",
        //         parsedPersonName: {
        //           firstName: "first name",
        //           lastName: "last name",
        //           middleName: "middle name",
        //           suffix: "suffix",
        //         },
        //         phoneNumber: "phone number",
        //         phoneExtension: "phone extension",
        //         companyName: "company name",
        //         faxNumber: "fax number",
        //       },
        //     },
        //     codCollectionAmount: {
        //       amount: 12.45,
        //       currency: "USD",
        //     },
        //     returnReferenceIndicatorType: "INVOICE",
        //     shipmentCodAmount: {
        //       amount: 12.45,
        //       currency: "USD",
        //     },
        //   },
        //   shipmentDryIceDetail: {
        //     totalWeight: {
        //       units: "LB",
        //       value: 10,
        //     },
        //     packageCount: 12,
        //   },
        //   internationalControlledExportDetail: {
        //     licenseOrPermitExpirationDate: "2019-12-03",
        //     licenseOrPermitNumber: "11",
        //     entryNumber: "125",
        //     foreignTradeZoneCode: "US",
        //     type: "WAREHOUSE_WITHDRAWAL",
        //   },
        //   homeDeliveryPremiumDetail: {
        //     phoneNumber: {
        //       areaCode: "901",
        //       localNumber: "3575012",
        //       extension: "200",
        //       personalIdentificationNumber: "98712345",
        //     },
        //     deliveryDate: "2019-06-26",
        //     homedeliveryPremiumType: "APPOINTMENT",
        //   },
        // },
        // emailNotificationDetail: {
        //   aggregationType: "PER_PACKAGE",
        //   emailNotificationRecipients: [
        //     {
        //       name: "Joe Smith",
        //       emailNotificationRecipientType: "SHIPPER",
        //       emailAddress: "jsmith3@aol.com",
        //       notificationFormatType: "TEXT",
        //       notificationType: "EMAIL",
        //       locale: "en_US",
        //       notificationEventType: ["ON_PICKUP_DRIVER_ARRIVED", "ON_SHIPMENT"],
        //     },
        //   ],
        //   personalMessage: "your personal message here",
        // },
        // expressFreightDetail: {
        //   bookingConfirmationNumber: "123456789812",
        //   shippersLoadAndCount: 123,
        //   packingListEnclosed: true,
        // },
        // variableHandlingChargeDetail: {
        //   rateType: "PREFERRED_CURRENCY",
        //   percentValue: 12.45,
        //   rateLevelType: "INDIVIDUAL_PACKAGE_RATE",
        //   fixedValue: {
        //     amount: 24.45,
        //     currency: "USD",
        //   },
        //   rateElementBasis: "NET_CHARGE_EXCLUDING_TAXES",
        // },
        // customsClearanceDetail: {
        //   regulatoryControls: "NOT_IN_FREE_CIRCULATION",
        //   brokers: [
        //     {
        //       broker: {
        //         address: {
        //           streetLines: ["10 FedEx Parkway", "Suite 302"],
        //           city: "Beverly Hills",
        //           stateOrProvinceCode: "CA",
        //           postalCode: "90210",
        //           countryCode: "US",
        //           residential: false,
        //         },
        //         contact: {
        //           personName: "John Taylor",
        //           emailAddress: "sample@company.com",
        //           parsedPersonName: {
        //             firstName: "John",
        //             lastName: "Taylor",
        //             middleName: "Raymond",
        //             suffix: "Jr",
        //           },
        //           phoneNumber: "1234567890",
        //           phoneExtension: 91,
        //           companyName: "Fedex",
        //           faxNumber: 1234567,
        //         },
        //         accountNumber: {
        //           value: "Your account number",
        //         },
        //         tins: [
        //           {
        //             number: "number",
        //             tinType: "FEDERAL",
        //             usage: "usage",
        //             effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //             expirationDate: "2000-01-23T04:56:07.000+00:00",
        //           },
        //         ],
        //         deliveryInstructions: "deliveryInstructions",
        //       },
        //       type: "IMPORT",
        //     },
        //   ],
        //   commercialInvoice: {
        //     originatorName: "originator Name",
        //     comments: ["optional comments for the commercial invoice"],
        //     customerReferences: [
        //       {
        //         customerReferenceType: "INVOICE_NUMBER",
        //         value: "3686",
        //       },
        //     ],
        //     taxesOrMiscellaneousCharge: {
        //       amount: 12.45,
        //       currency: "USD",
        //     },
        //     taxesOrMiscellaneousChargeType: "COMMISSIONS",
        //     freightCharge: {
        //       amount: 12.45,
        //       currency: "USD",
        //     },
        //     packingCosts: {
        //       amount: 12.45,
        //       currency: "USD",
        //     },
        //     handlingCosts: {
        //       amount: 12.45,
        //       currency: "USD",
        //     },
        //     declarationStatement: "declarationStatement",
        //     termsOfSale: "FCA",
        //     specialInstructions: 'specialInstructions"',
        //     shipmentPurpose: "REPAIR_AND_RETURN",
        //     emailNotificationDetail: {
        //       emailAddress: "neena@fedex.com",
        //       type: "EMAILED",
        //       recipientType: "SHIPPER",
        //     },
        //   },
        //   freightOnValue: "OWN_RISK",
        //   dutiesPayment: {
        //     payor: {
        //       responsibleParty: {
        //         address: {
        //           streetLines: ["10 FedEx Parkway", "Suite 302"],
        //           city: "Beverly Hills",
        //           stateOrProvinceCode: "CA",
        //           postalCode: "38127",
        //           countryCode: "US",
        //           residential: false,
        //         },
        //         contact: {
        //           personName: "John Taylor",
        //           emailAddress: "sample@company.com",
        //           parsedPersonName: {
        //             firstName: "first name",
        //             lastName: "last name",
        //             middleName: "middle name",
        //             suffix: "suffix",
        //           },
        //           phoneNumber: "1234567890",
        //           phoneExtension: "phone extension",
        //           companyName: "Fedex",
        //           faxNumber: "fax number",
        //         },
        //         accountNumber: {
        //           value: "Your account number",
        //         },
        //         tins: [
        //           {
        //             number: "number",
        //             tinType: "FEDERAL",
        //             usage: "usage",
        //             effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //             expirationDate: "2000-01-23T04:56:07.000+00:00",
        //           },
        //           {
        //             number: "number",
        //             tinType: "FEDERAL",
        //             usage: "usage",
        //             effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //             expirationDate: "2000-01-23T04:56:07.000+00:00",
        //           },
        //         ],
        //       },
        //     },
        //     billingDetails: {
        //       billingCode: "billingCode",
        //       billingType: "billingType",
        //       aliasId: "aliasId",
        //       accountNickname: "accountNickname",
        //       accountNumber: "Your account number",
        //       accountNumberCountryCode: "US",
        //     },
        //     paymentType: "SENDER",
        //   },
        //   commodities: [
        //     {
        //       unitPrice: {
        //         amount: 12.45,
        //         currency: "USD",
        //       },
        //       additionalMeasures: [
        //         {
        //           quantity: 12.45,
        //           units: "KG",
        //         },
        //       ],
        //       numberOfPieces: 12,
        //       quantity: 125,
        //       quantityUnits: "Ea",
        //       customsValue: {
        //         amount: 12.45,
        //         currency: "USD",
        //       },
        //       countryOfManufacture: "US",
        //       cIMarksAndNumbers: "87123",
        //       harmonizedCode: "0613",
        //       description: "description",
        //       name: "non-threaded rivets",
        //       weight: {
        //         units: "KG",
        //         value: 68,
        //       },
        //       exportLicenseNumber: "26456",
        //       exportLicenseExpirationDate: "2022-02-02T04:52:06Z",
        //       partNumber: "167",
        //       purpose: "BUSINESS",
        //       usmcaDetail: {
        //         originCriterion: "A",
        //       },
        //     },
        //   ],
        //   isDocumentOnly: true,
        //   recipientCustomsId: {
        //     type: "PASSPORT",
        //     value: "123",
        //   },
        //   customsOption: {
        //     description: "Description",
        //     type: "COURTESY_RETURN_LABEL",
        //   },
        //   importerOfRecord: {
        //     address: {
        //       streetLines: ["10 FedEx Parkway", "Suite 302"],
        //       city: "Beverly Hills",
        //       stateOrProvinceCode: "CA",
        //       postalCode: "90210",
        //       countryCode: "US",
        //       residential: false,
        //     },
        //     contact: {
        //       personName: "John Taylor",
        //       emailAddress: "sample@company.com",
        //       phoneExtension: "000",
        //       phoneNumber: "XXXX345671",
        //       companyName: "Fedex",
        //     },
        //     accountNumber: {
        //       value: "Your account number",
        //     },
        //     tins: [
        //       {
        //         number: "123567",
        //         tinType: "FEDERAL",
        //         usage: "usage",
        //         effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //         expirationDate: "2000-01-23T04:56:07.000+00:00",
        //       },
        //     ],
        //   },
        //   generatedDocumentLocale: "en_US",
        //   exportDetail: {
        //     destinationControlDetail: {
        //       endUser: "dest country user",
        //       statementTypes: "DEPARTMENT_OF_COMMERCE",
        //       destinationCountries: ["USA", "India"],
        //     },
        //     b13AFilingOption: "NOT_REQUIRED",
        //     exportComplianceStatement: "export Compliance Statement",
        //     permitNumber: "12345",
        //   },
        //   totalCustomsValue: {
        //     amount: 12.45,
        //     currency: "USD",
        //   },
        //   partiesToTransactionAreRelated: true,
        //   declarationStatementDetail: {
        //     usmcaLowValueStatementDetail: {
        //       countryOfOriginLowValueDocumentRequested: true,
        //       customsRole: "EXPORTER",
        //     },
        //   },
        //   insuranceCharge: {
        //     amount: 12.45,
        //     currency: "USD",
        //   },
        // },
        // smartPostInfoDetail: {
        //   ancillaryEndorsement: "RETURN_SERVICE",
        //   hubId: "5015",
        //   indicia: "PRESORTED_STANDARD",
        //   specialServices: "USPS_DELIVERY_CONFIRMATION",
        // },
        // blockInsightVisibility: true,
        labelSpecification: {
          labelFormatType: 'COMMON2D',
          labelOrder: 'SHIPPING_LABEL_FIRST',
          customerSpecifiedDetail: {
            maskedData: ['CUSTOMS_VALUE', 'TOTAL_WEIGHT'],
            regulatoryLabels: [
              {
                generationOptions: 'CONTENT_ON_SHIPPING_LABEL_ONLY',
                type: 'ALCOHOL_SHIPMENT_LABEL',
              },
            ],
            additionalLabels: [
              {
                type: 'CONSIGNEE',
                count: 1,
              },
            ],
            docTabContent: {
              docTabContentType: 'BARCODED',
              zone001: {
                docTabZoneSpecifications: [
                  {
                    zoneNumber: 0,
                    header: '',
                    dataField: '',
                    literalValue: '',
                    justification: 'RIGHT',
                  },
                ],
              },
              barcoded: {
                symbology: 'UCC128',
                specification: {
                  zoneNumber: 0,
                  header: '',
                  dataField: '',
                  literalValue: '',
                  justification: 'RIGHT',
                },
              },
            },
          },
          printedLabelOrigin: {
            address: {
              streetLines: sender.address.streetLines,
              city: sender.address.city,
              stateOrProvinceCode: sender.address.stateOrProvinceCode,
              postalCode: sender.address.postalCode,
              countryCode: sender.address.countryCode,
              residential: false,
            },
            contact: {
              personName: sender.contact.personName,
              emailAddress: sender.contact.emailAddress,
              // parsedPersonName: {
              //   firstName: "first name",
              //   lastName: "last name",
              //   middleName: "middle name",
              //   suffix: "suffix",
              // },
              phoneExtension: sender.contact.phoneExtension,
              phoneNumber: sender.contact.phoneNumber,
              companyName: sender.contact.companyName,
              faxNumber: sender.contact.faxNumber,
            },
          },
          labelStockType: 'PAPER_4X6',
          labelRotation: 'UPSIDE_DOWN',
          imageType: 'PDF',
          labelPrintingOrientation: 'TOP_EDGE_OF_TEXT_FIRST',
          returnedDispositionDetail: true,
        },
        // shippingDocumentSpecification: {
        //   generalAgencyAgreementDetail: {
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PDF",
        //     },
        //   },
        //   returnInstructionsDetail: {
        //     customText: "This is additional text printed on Return instr",
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PNG",
        //     },
        //   },
        //   op900Detail: {
        //     customerImageUsages: [
        //       {
        //         id: "IMAGE_5",
        //         type: "SIGNATURE",
        //         providedImageType: "LETTER_HEAD",
        //       },
        //     ],
        //     signatureName: "Signature Name",
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PDF",
        //     },
        //   },
        //   usmcaCertificationOfOriginDetail: {
        //     customerImageUsages: [
        //       {
        //         id: "IMAGE_5",
        //         type: "SIGNATURE",
        //         providedImageType: "LETTER_HEAD",
        //       },
        //     ],
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PDF",
        //     },
        //     certifierSpecification: "EXPORTER",
        //     importerSpecification: "UNKNOWN",
        //     producerSpecification: "SAME_AS_EXPORTER",
        //     producer: {
        //       address: {
        //         streetLines: ["10 FedEx Parkway", "Suite 302"],
        //         city: "Beverly Hills",
        //         stateOrProvinceCode: "CA",
        //         postalCode: "90210",
        //         countryCode: "US",
        //         residential: false,
        //       },
        //       contact: {
        //         personName: "John Taylor",
        //         emailAddress: "sample@company.com",
        //         phoneExtension: "000",
        //         phoneNumber: "XXXX345671",
        //         companyName: "Fedex",
        //       },
        //       accountNumber: {
        //         value: process.env.FEDEX_ACCOUNT_NUMBER,
        //       },
        //       tins: [
        //         {
        //           number: "123567",
        //           tinType: "FEDERAL",
        //           usage: "usage",
        //           effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //           expirationDate: "2000-01-23T04:56:07.000+00:00",
        //         },
        //       ],
        //     },
        //     blanketPeriod: {
        //       begins: "22-01-2020",
        //       ends: "2-01-2020",
        //     },
        //     certifierJobTitle: "Manager",
        //   },
        //   usmcaCommercialInvoiceCertificationOfOriginDetail: {
        //     customerImageUsages: [
        //       {
        //         id: "IMAGE_5",
        //         type: "SIGNATURE",
        //         providedImageType: "LETTER_HEAD",
        //       },
        //     ],
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PDF",
        //     },
        //     certifierSpecification: "EXPORTER",
        //     importerSpecification: "UNKNOWN",
        //     producerSpecification: "SAME_AS_EXPORTER",
        //     producer: {
        //       address: {
        //         streetLines: ["10 FedEx Parkway", "Suite 302"],
        //         city: "Beverly Hills",
        //         stateOrProvinceCode: "CA",
        //         postalCode: "90210",
        //         countryCode: "US",
        //         residential: false,
        //       },
        //       contact: {
        //         personName: "John Taylor",
        //         emailAddress: "sample@company.com",
        //         phoneExtension: "000",
        //         phoneNumber: "XXXX345671",
        //         companyName: "Fedex",
        //       },
        //       accountNumber: {
        //         value: "Your account number",
        //       },
        //       tins: [
        //         {
        //           number: "123567",
        //           tinType: "FEDERAL",
        //           usage: "usage",
        //           effectiveDate: "2000-01-23T04:56:07.000+00:00",
        //           expirationDate: "2000-01-23T04:56:07.000+00:00",
        //         },
        //       ],
        //     },
        //     certifierJobTitle: "Manager",
        //   },
        //   shippingDocumentTypes: [
        //     "RETURN_INSTRUCTIONS",
        //     "DANGEROUS_GOODS_SHIPPERS_DECLARATION",
        //   ],
        //   certificateOfOrigin: {
        //     customerImageUsages: [
        //       {
        //         id: "IMAGE_5",
        //         type: "SIGNATURE",
        //         providedImageType: "LETTER_HEAD",
        //       },
        //     ],
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PDF",
        //     },
        //   },
        //   commercialInvoiceDetail: {
        //     customerImageUsages: [
        //       {
        //         id: "IMAGE_5",
        //         type: "SIGNATURE",
        //         providedImageType: "LETTER_HEAD",
        //       },
        //     ],
        //     documentFormat: {
        //       provideInstructions: true,
        //       optionsRequested: {
        //         options: ["SUPPRESS_ADDITIONAL_LANGUAGES", "SHIPPING_LABEL_LAST"],
        //       },
        //       stockType: "PAPER_LETTER",
        //       dispositions: [
        //         {
        //           eMailDetail: {
        //             eMailRecipients: [
        //               {
        //                 emailAddress: "email@fedex.com",
        //                 recipientType: "THIRD_PARTY",
        //               },
        //             ],
        //             locale: "en_US",
        //             grouping: "NONE",
        //           },
        //           dispositionType: "CONFIRMED",
        //         },
        //       ],
        //       locale: "en_US",
        //       docType: "PDF",
        //     },
        //   },
        // },
        rateRequestType: ['LIST', 'PREFERRED'],
        preferredCurrency: 'USD',
        totalPackageCount: shipment.totalPackageCount,
        masterTrackingId: {
          formId: masterTrackingId.formId,
          trackingIdType: 'EXPRESS',
          uspsApplicationId: masterTrackingId.uspsApplicationId,
          trackingNumber: masterTrackingId.trackingNumber,
        },
        requestedPackageLineItems: [
          {
            sequenceNumber: '',
            subPackagingType: 'BOX',
            customerReferences: [
              {
                customerReferenceType: 'INVOICE_NUMBER',
                value: invoiceNumber,
              },
            ],
            declaredValue: {
              amount: shipment.declaredValue,
              currency: 'USD',
            },
            weight: {
              units: 'KG',
              value: shipment.weight,
            },
            // dimensions: {
            //   length: "",
            //   width: "",
            //   height: "",
            //   units: "CM",
            // },
            // groupPackageCount: 2,
            itemDescriptionForClearance: shipment.clearanceDescription,
            // contentRecord: [
            //   {
            //     itemNumber: "2876",
            //     receivedQuantity: 256,
            //     description: "Description",
            //     partNumber: "456",
            //   },
            // ],
            itemDescription: shipment.description,
            // variableHandlingChargeDetail: {
            //   rateType: "PREFERRED_CURRENCY",
            //   percentValue: 12.45,
            //   rateLevelType: "INDIVIDUAL_PACKAGE_RATE",
            //   fixedValue: {
            //     amount: 24.45,
            //     currency: "USD",
            //   },
            //   rateElementBasis: "NET_CHARGE_EXCLUDING_TAXES",
            // },
            // packageSpecialServices: {
            //   specialServiceTypes: ["ALCOHOL", "NON_STANDARD_CONTAINER"],
            //   signatureOptionType: "SERVICE_DEFAULT",
            //   priorityAlertDetail: {
            //     enhancementTypes: ["PRIORITY_ALERT_PLUS"],
            //     content: ["string"],
            //   },
            //   signatureOptionDetail: {
            //     signatureReleaseNumber: "23456",
            //   },
            //   alcoholDetail: {
            //     alcoholRecipientType: "string",
            //     shipperAgreementType: "Retailer",
            //   },
            //   dangerousGoodsDetail: {
            //     accessibility: "INACCESSIBLE",
            //     options: ["LIMITED_QUANTITIES_COMMODITIES", "ORM_D"],
            //   },
            //   packageCODDetail: {
            //     codCollectionAmount: {
            //       amount: 12.45,
            //       currency: "USD",
            //     },
            //   },
            //   pieceCountVerificationBoxCount: 0,
            //   batteryDetails: [
            //     {
            //       batteryPackingType: "CONTAINED_IN_EQUIPMENT",
            //       batteryRegulatoryType: "IATA_SECTION_II",
            //       batteryMaterialType: "LITHIUM_METAL",
            //     },
            //   ],
            //   dryIceWeight: {
            //     units: "KG",
            //     value: 68,
            //   },
            // },
          },
        ],
      },
      labelResponseOptions: 'LABEL', // LABEL or URL_ONLY
      accountNumber: {
        value: FEDEX_ACCOUNT_NUMBER,
      },
      shipAction: 'CONFIRM',
      processingOptionType: 'ALLOW_ASYNCHRONOUS',
      oneLabelAtATime: true,
    }
    var config = {
      method: 'post',
      url: `${FEDEX_API_BASEURL}/ship/v1/shipments`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    }
    console.log(JSON.stringify(data))

    const response = await axios(config)
    return response.data.output
  } catch (err) {
    return err
    // res.status(err.response.status).send(err.response.data)
  }
}

module.exports = createShipment
