const Service = require('@/Service');
const service = new Service

const getFreightDataByRange = async (start_date, start_time, end_date, end_time) => {
  try {
    const params = {start_date, start_time, end_date, end_time}
    const res = await service.get('http://api.freightsnap.com/ship_datetime_range_data_rest.php?pro_data_rest.php?',
    params, 
    (status, data) => { return data }   
    )
    return res;
  } catch (error) {
    console.error(error)
    return error;
  }
}

module.exports = getFreightDataByRange;