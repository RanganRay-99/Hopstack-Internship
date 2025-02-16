const axios = require('axios').default;

const BASE_URL = 'http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&xml=';
const get_request_string = (user_id, zip5) =>{
    
    const X = `<CityStateLookupRequest USERID="${user_id}"><ZipCode><Zip5>${zip5}</Zip5></ZipCode></CityStateLookupRequest>`
    return X;
};

const cityStateLookup = async (params) => {
    try {
      const { USERID, zip5 } = params
      const xml = get_request_string(USERID, zip5);
      console.log(xml);
      const res = await axios.get(BASE_URL+encodeURIComponent(xml));
      console.log(res.data);
      return res;
  } catch (err) {
      return err
    }
  }

cityStateLookup({USERID:"xxxxx", zip5:"20024"})
module.exports = cityStateLookup