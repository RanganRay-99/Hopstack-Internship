const axios = require('axios').default

const csMeasureData = async (params) => {
  try {
    const { url } = params
    const res = await axios.get(`${url}/csMeasureData`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    return error
  }
}

module.exports = csMeasureData
