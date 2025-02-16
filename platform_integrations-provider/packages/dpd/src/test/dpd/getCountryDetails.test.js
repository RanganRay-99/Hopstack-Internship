const { getCountryDetails } = require('../../../src')
const testFunction = async () => {
  const params = {
    countryCode: 'GB',
  }
  const data = await getCountryDetails(params)
  console.log(data)
}

testFunction()

// {
//   data: {
//     country: {
//       countryCode: 'GB',
//       countryName: 'United Kingdom',
//       isoCode: '826',
//       isEUCountry: false,
//       isLiabilityAllowed: true,
//       liabilityMax: 15000,
//       isPostcodeRequired: true
//     }
//   }
// }
