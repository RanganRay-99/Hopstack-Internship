const { getAllServices } = require('../../../src')
const testFunction = async () => {
  const params = {
    deliveryPostcode: 'L10AY',
    collectionPostcode: 'IP39RU',
  }
  const data = await getAllServices(params)
  console.log(data)
}

testFunction()

// [
//   {
//     network: { networkCode: '1^01', networkDescription: 'PARCEL SUNDAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^16', serviceDescription: 'Sunday' }
//   },
//   {
//     network: {
//       networkCode: '1^06',
//       networkDescription: 'FREIGHT PARCEL SUNDAY'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^16', serviceDescription: 'Sunday' }
//   },
//   {
//     network: { networkCode: '1^08', networkDescription: 'PALLET SUNDAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^16', serviceDescription: 'Sunday' }
//   },
//   {
//     network: { networkCode: '1^09', networkDescription: 'EXPRESSPAK SUNDAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^16', serviceDescription: 'Sunday' }
//   },
//   {
//     network: { networkCode: '1^11', networkDescription: 'DPD TWO DAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^1', serviceDescription: 'Dpd Two Day' }
//   },
//   {
//     network: { networkCode: '1^12', networkDescription: 'DPD NEXT DAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^2', serviceDescription: 'Dpd Next Day' }
//   },
//   {
//     network: { networkCode: '1^13', networkDescription: 'DPD 12:00' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^3', serviceDescription: 'Dpd 12:00' }
//   },
//   {
//     network: { networkCode: '1^14', networkDescription: 'DPD 10:30' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^4', serviceDescription: 'Dpd 10:30' }
//   },
//   {
//     network: { networkCode: '1^16', networkDescription: 'PARCEL SATURDAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^6', serviceDescription: 'Saturday' }
//   },
//   {
//     network: {
//       networkCode: '1^17',
//       networkDescription: 'PARCEL SATURDAY 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^7', serviceDescription: 'Saturday 12:00' }
//   },
//   {
//     network: {
//       networkCode: '1^18',
//       networkDescription: 'PARCEL SATURDAY 10:30'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^8', serviceDescription: 'Saturday 10:30' }
//   },
//   {
//     network: {
//       networkCode: '1^22',
//       networkDescription: 'PARCEL RETURN TO SHOP'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^13', serviceDescription: 'Return To Shop' }
//   },
//   {
//     network: { networkCode: '1^29', networkDescription: 'PARCEL SUNDAY 12:00' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^14', serviceDescription: 'Sunday 12:00' }
//   },
//   {
//     network: {
//       networkCode: '1^31',
//       networkDescription: 'FREIGHT PARCEL SUNDAY 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^14', serviceDescription: 'Sunday 12:00' }
//   },
//   {
//     network: {
//       networkCode: '1^32',
//       networkDescription: 'EXPRESSPAK DPD NEXT DAY'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^2', serviceDescription: 'Dpd Next Day' }
//   },
//   {
//     network: { networkCode: '1^33', networkDescription: 'EXPRESSPAK DPD 12:00' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^3', serviceDescription: 'Dpd 12:00' }
//   },
//   {
//     network: { networkCode: '1^34', networkDescription: 'EXPRESSPAK DPD 10:30' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^4', serviceDescription: 'Dpd 10:30' }
//   },
//   {
//     network: { networkCode: '1^36', networkDescription: 'EXPRESSPAK SATURDAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^6', serviceDescription: 'Saturday' }
//   },
//   {
//     network: {
//       networkCode: '1^37',
//       networkDescription: 'EXPRESSPAK SATURDAY 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^7', serviceDescription: 'Saturday 12:00' }
//   },
//   {
//     network: {
//       networkCode: '1^38',
//       networkDescription: 'EXPRESSPAK SATURDAY 10:30'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^8', serviceDescription: 'Saturday 10:30' }
//   },
//   {
//     network: {
//       networkCode: '1^51',
//       networkDescription: 'EXPRESSPAK SUNDAY 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^3', productDescription: 'Expresspak' },
//     service: { serviceCode: '1^14', serviceDescription: 'Sunday 12:00' }
//   },
//   {
//     network: { networkCode: '1^69', networkDescription: 'PALLET SUNDAY 12:00' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^14', serviceDescription: 'Sunday 12:00' }
//   },
//   {
//     network: { networkCode: '1^71', networkDescription: 'PALLET DPD TWO DAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^1', serviceDescription: 'Dpd Two Day' }
//   },
//   {
//     network: { networkCode: '1^72', networkDescription: 'PALLET DPD NEXT DAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^2', serviceDescription: 'Dpd Next Day' }
//   },
//   {
//     network: { networkCode: '1^73', networkDescription: 'PALLET DPD 12:00' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^3', serviceDescription: 'Dpd 12:00' }
//   },
//   {
//     network: { networkCode: '1^74', networkDescription: 'PALLET DPD 10:30' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^4', serviceDescription: 'Dpd 10:30' }
//   },
//   {
//     network: { networkCode: '1^76', networkDescription: 'PALLET SATURDAY' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^6', serviceDescription: 'Saturday' }
//   },
//   {
//     network: {
//       networkCode: '1^77',
//       networkDescription: 'PALLET SATURDAY 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^7', serviceDescription: 'Saturday 12:00' }
//   },
//   {
//     network: {
//       networkCode: '1^78',
//       networkDescription: 'PALLET SATURDAY 10:30'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^7', productDescription: 'Pallet' },
//     service: { serviceCode: '1^8', serviceDescription: 'Saturday 10:30' }
//   },
//   {
//     network: {
//       networkCode: '1^81',
//       networkDescription: 'FREIGHT PARCEL DPD TWO DAY'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^1', serviceDescription: 'Dpd Two Day' }
//   },
//   {
//     network: {
//       networkCode: '1^82',
//       networkDescription: 'FREIGHT PARCEL DPD NEXT DAY'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^2', serviceDescription: 'Dpd Next Day' }
//   },
//   {
//     network: {
//       networkCode: '1^83',
//       networkDescription: 'FREIGHT PARCEL DPD 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^3', serviceDescription: 'Dpd 12:00' }
//   },
//   {
//     network: { networkCode: '1^84', networkDescription: 'FREIGHT DPD 10:30' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^4', serviceDescription: 'Dpd 10:30' }
//   },
//   {
//     network: {
//       networkCode: '1^86',
//       networkDescription: 'FREIGHT PARCEL SATURDAY'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^6', serviceDescription: 'Saturday' }
//   },
//   {
//     network: {
//       networkCode: '1^87',
//       networkDescription: 'FREIGHT PARCEL SATURDAY 12:00'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^7', serviceDescription: 'Saturday 12:00' }
//   },
//   {
//     network: {
//       networkCode: '1^88',
//       networkDescription: 'FREIGHT PARCEL SATURDAY 10:30'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^8', productDescription: 'Freight Parcel' },
//     service: { serviceCode: '1^8', serviceDescription: 'Saturday 10:30' }
//   },
//   {
//     network: { networkCode: '1^91', networkDescription: 'PARCEL SHIP TO SHOP' },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^1', productDescription: 'Parcel' },
//     service: { serviceCode: '1^24', serviceDescription: 'Ship To Shop' }
//   },
//   {
//     network: {
//       networkCode: '1^98',
//       networkDescription: 'Expak - Pickup Classic'
//     },
//     isLiabilityAllowed: false,
//     invoiceRequired: false,
//     product: { productCode: '1^26', productDescription: 'Shop Expresspak' },
//     service: { serviceCode: '1^9', serviceDescription: 'Dpd Classic' }
//   }
// ]
