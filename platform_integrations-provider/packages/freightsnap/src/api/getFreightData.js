const Service = require('@/Service');
const service = new Service

const getFreightData = async (pro) => {
  try {
    const params = {pro}
    const res = await service.get('http://api.freightsnap.com/pro_data_rest.php?',
    params, 
    (status, data) => { return data }  
    )
    return res;
  } catch (error) {
    console.error(error)
    return error;
  }
}

module.exports = getFreightData;