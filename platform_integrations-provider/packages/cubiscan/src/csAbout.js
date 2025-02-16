const axios = require('axios').default

const csAbout = async (params) => {
  try {
    const { url } = params
    const res = await axios.get(`${url}/csAbout`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    return error
  }
}

module.exports = csAbout
