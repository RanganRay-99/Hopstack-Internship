const WooCommerce = require("../../service");

const CreateOrder = async ({data}) =>{
    try{
        const response = await WooCommerce.post("orders", data);
        return response.data;
    }
    catch(error) {
      console.log(error.response.data);
      return error.response.data;
    };
};

module.exports = CreateOrder;