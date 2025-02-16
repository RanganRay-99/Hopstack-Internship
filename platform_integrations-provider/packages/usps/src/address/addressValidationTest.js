const axios = require('axios').default;

let xml='<AddressValidateRequest USERID="xxxxxxx"><Revision>1</Revision><Address><Address1>Suite 6100</Address1><Address2>185 Berry St</Address2><City>San Francisco</City><State>CA</State><Zip5>94556</Zip5><Zip4></Zip4></Address></AddressValidateRequest>'


let url='http://production.shippingapis.com/ShippingAPI.dll?API=Verify&xml=' + encodeURIComponent(xml)

axios.get(url)
    .then(function (response){
        console.log(response.data);
    })
    .catch(function (error){
        console.log(error)
    });
