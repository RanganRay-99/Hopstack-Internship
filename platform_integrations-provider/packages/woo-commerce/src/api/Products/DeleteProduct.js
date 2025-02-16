const WooCommerce = require("../../service");

const DeleteProduct = async ({id}) =>{
    try{
        const response = await WooCommerce.delete(`products/${id}`,{
            force: true
          });
        console.log(response.data);
        return response.data;
    }
    catch(error) {
      console.log(error.response.data);
      return error.response.data;
    };
};

module.exports=DeleteProduct;