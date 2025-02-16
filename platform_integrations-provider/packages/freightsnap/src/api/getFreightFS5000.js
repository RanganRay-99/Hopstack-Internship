const Service = require('@/Service');
const service = new Service

const getFreightFS5000 = async (dimensionerIP, proNum, weight, sendImage) => {
  try {
    const params = {proNum, weight, sendImage}
    const res = await service.get(`http://${dimensionerIP}/WebTrigger/returnDims?`,
    params, 
    (status, data) => { return data }   
    )
    return res;
  } catch (error) {
    console.error(error)
    return error;
  }
}

module.exports = getFreightFS5000;