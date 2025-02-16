const axios = require('axios').default

const csMeasure = async (params) => {
  try {
    const { url } = params
    const res = await axios.get(`${url}/csMeasure`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    return error
  }
}

module.exports = csMeasure
