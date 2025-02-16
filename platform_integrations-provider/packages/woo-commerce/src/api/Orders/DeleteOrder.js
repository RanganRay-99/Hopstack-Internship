const WooCommerce = require("../../service");

const DeleteOrder = async ({id}) =>{
    try{
        const response = await WooCommerce.delete(`orders/${id}`,{
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

module.exports=DeleteOrder;