const axios = require('axios').default
const BASE_URL = 'http://production.shippingapis.com/ShippingAPI.dll?API=Verify&xml='

const get_request_string = ({ userId, revision, firmName, address1, address2, city, state, urbanization, zip5, zip4 }) =>
  `<AddressValidateRequest USERID="${userId}"><Revision>${revision}</Revision><Address><FirmName>${firmName}</FirmName><Address1>${address1}</Address1><Address2>${address2}</Address2><City>${city}</City><State>${state}</State><Urbanization>${urbanization}</Urbanization><Zip5>${zip5}</Zip5><Zip4>${zip4}</Zip4></Address></AddressValidateRequest>`

const addressValidation = async (params) => {
  try {
    const { userId, revision, firmName, address1, address2, city, state, urbanization, zip5, zip4 } = params
    const xml = get_request_string({
      userId,
      revision,
      firmName,
      address1,
      address2,
      city,
      state,
      urbanization,
      zip5,
      zip4,
    })
    const res = await axios.get(BASE_URL + encodeURIComponent(xml))
    return res.data
  } catch (err) {
    return err
  }
}
// addressValidation({
//   userId: '860HOPST5381',
//   revision: '1',
//   firmName: '',
//   address1: 'Suite 6100',
//   address2: '185 Berry St',
//   city: 'San Francisco',
//   state: 'CA',
//   urbanization: '',
//   zip5: '92688',
//   zip4: '',
// })
module.exports = addressValidation
