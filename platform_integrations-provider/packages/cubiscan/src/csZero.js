const axios = require('axios').default

const csZero = async (params) => {
  try {
    const { url } = params
    const res = await axios.get(`${url}/csZero`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    return error
  }
}

module.exports = csZero
