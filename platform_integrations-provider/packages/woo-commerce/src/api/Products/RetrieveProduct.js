const WooCommerce = require("../../service");

const RetrieveProduct = async ({id}) =>{
    try{
        const response = await WooCommerce.get(`products/${id}`);
        console.log(response.data);
        return response.data;
    }
    catch(error) {
      console.log(error.response.data);
      return error.response.data;
    };
};

module.exports=RetrieveProduct;
