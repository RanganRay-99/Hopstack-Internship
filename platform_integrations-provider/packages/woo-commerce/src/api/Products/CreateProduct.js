const WooCommerce = require("../../service");

const CreateProduct = async ({data}) =>{
    try{
        const response = await WooCommerce.post("products", data);
        return response.data;
    }
    catch(error) {
      console.log(error.response.data);
      return error.response.data;
    };
};

module.exports=CreateProduct;