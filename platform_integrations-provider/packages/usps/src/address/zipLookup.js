const axios = require('axios').default;

const BASE_URL = 'http://production.shippingapis.com/ShippingAPI.dll?API=ZipCodeLookup&xml=';
const get_request_string = (user_id, Address1, Address2, City, State) =>{
    
    const X = `<ZipCodeLookupRequest USERID="${user_id}"><Address><Address1>${Address1}</Address1><Address2>${Address2}</Address2><City>${City}</City><State>${State}</State></Address></ZipCodeLookupRequest>`
    return X;
};

const zipLookup = async (params) => {
    try {
      const { USERID, Address1, Address2, City, State} = params
      const xml = get_request_string(USERID, Address1, Address2, City, State);
      console.log(xml);
      const res = await axios.get(BASE_URL+encodeURIComponent(xml));
      console.log(res.data);
      return res;
  } catch (err) {
      return err
    }
  }

zipLookup({USERID:"xxxxxx", Address1:"Suite 6100", Address2:"185 Berry St", City:"San Francisco", State:"CA"})
module.exports = zipLookup