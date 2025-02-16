const axios = require('axios').default;

const BASE_URL = 'http://production.shippingapis.com/ShippingAPI.dll?API=PTSRre&xml=';
const get_request_string = (user_id,track_id, mpSuffix,mpDate, requestType, first_name, last_name, email1,cust_id, table_code, client_ip, source_id) =>{
    
    const X = `<PTSTPodRequest USERID="${user_id}"><TrackId>${track_id}</TrackId><MpSuffix>${mpSuffix}</MpSuffix><MpDate>${mpDate}</MpDate><RequestType>${requestType}</RequestType><FirstName>${first_name}</FirstName><LastName>${last_name}</LastName><Email1>${email1}</Email1><Email2></Email2><Email3></Email3><CustRegID>${cust_id}</CustRegID><TableCode>${table_code}</TableCode><ClientIp>${client_ip}</ClientIp><SourceId>${source_id}</SourceId></PTSTPodRequest>`
    return X;
};

const trackProofOfDelivery = async (params) => {
    try {
      const { user_id,track_id, mpSuffix,mpDate, requestType, first_name, last_name, email1,cust_id, table_code, client_ip, source_id} = params
      const xml = get_request_string(user_id,track_id, mpSuffix,mpDate, requestType, first_name, last_name, email1,cust_id, table_code, client_ip, source_id);
      console.log(xml);
      const res = await axios.get(BASE_URL+encodeURIComponent(xml));
      console.log(res.data);
      return res;
  } catch (err) {
      return err
    }
  }

trackProofOfDelivery({user_id:"xxxxxx",track_id:"xxxxxx", client_ip:"", source_id:"", mpSuffix:"",mpDate:"", requestType:"", first_name:"", last_name:"", email1:"", table_code:"", cust_id:""})
module.exports = trackProofOfDelivery