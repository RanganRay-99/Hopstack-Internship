const WooCommerce = require("../../service");

const BatchUpdateOrder = async ({data}) =>{
    try{
        const response = await WooCommerce.post("orders/batch",data);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
      console.log(error.response.data);
      return error.response.data;
    };
};

module.exports=BatchUpdateOrder;