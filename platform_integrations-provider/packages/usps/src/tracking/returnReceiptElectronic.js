const axios = require('axios').default;

const BASE_URL = 'http://production.shippingapis.com/ShippingAPI.dll?API=PTSRre&xml=';
const get_request_string = (user_id,track_id, client_ip, source_id, mpSuffix,mpDate, requestType, first_name, last_name, email1, table_code, cust_id) =>{
    
    const X = `<PTSRreRequest USERID="${user_id}"><TrackId>${track_id}</TrackId><ClientIp>${client_ip}</ClientIp><SourceId>${source_id}</SourceId><MpSuffix>${mpSuffix}</MpSuffix><MpDate>${mpDate}</MpDate><RequestType>${requestType}</RequestType><FirstName>${first_name}</FirstName><LastName>${last_name}</LastName><Email1>${email1}</Email1><Email2></Email2><Email3></Email3><TableCode>${table_code}</TableCode><CustRegID>${cust_id}</CustRegID></PTSPodlRequest>`
    return X;
};

const returnReceiptElectronic = async (params) => {
    try {
      const { user_id,track_id, client_ip, source_id, mpSuffix,mpDate, requestType, first_name, last_name, email1, table_code, cust_id} = params
      const xml = get_request_string(user_id,track_id, client_ip, source_id, mpSuffix,mpDate, requestType, first_name, last_name, email1, table_code, cust_id);
      console.log(xml);
      const res = await axios.get(BASE_URL+encodeURIComponent(xml));
      console.log(res.data);
      return res;
  } catch (err) {
      return err
    }
  }

returnReceiptElectronic({user_id:"xxxxxx",track_id:"xxxxxx", client_ip:"", source_id:"", mpSuffix:"",mpDate:"", requestType:"", first_name:"", last_name:"", email1:"", table_code:"", cust_id:""})
module.exports = returnReceiptElectronic