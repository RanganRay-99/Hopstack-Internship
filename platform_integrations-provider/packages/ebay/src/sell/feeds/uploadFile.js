const { getToken } = require('@/index')

const axios = require('axios').default



const uploadFile = async (params) => {
  try {
    const { clientId, clientSecret, refresh_token, task_id, creationDate, fileName, modificationDate, name, parameters, readDate, size, type} = params
    const {access_token} = await getToken({clientId, clientSecret, refresh_token})
    const data = {
        task_id,
        creationDate,
        fileName,
        modificationDate,
        name,
        parameters,
        readDate,
        size,
        type,
    }
    const axiosConfig = {
      method: 'post',
      url: `https://api.ebay.com/sell/feed/v1/task/${task_id}/upload_file`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
        
      },
      data,
    }
    const response = await axios(axiosConfig)
    return response.data
  } catch (err) {
    return err
  }
}

module.exports = uploadFile