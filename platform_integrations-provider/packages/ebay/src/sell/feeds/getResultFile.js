const getToken = require('../../auth/getToken')
const axios = require('axios').default
const AdmZip = require('adm-zip')
const xml2js = require('xml2js')

const getResultFile = async (params) => {
  try {
    const { clientId, clientSecret, refreshToken, taskId } = params

    const { access_token } = await getToken({ clientId, clientSecret, refreshToken })

    const axiosConfig = {
      method: 'get',
      url: `https://api.ebay.com/sell/feed/v1/task/${taskId}/download_result_file`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      responseType: 'arraybuffer',
    }

    const response = await axios(axiosConfig)

    // Buffer to XML
    const zip = new AdmZip(response.data)
    const zipEntries = await zip.getEntries()
    const buffer = zipEntries[0].getData()
    const xml = buffer.toString('utf-8')

    // XML to JSON
    let json = ''
    xml2js.parseString(xml, (err, results) => (json = JSON.stringify(results)))

    return json
  } catch (err) {
    return err
  }
}

// ;(async () => {
//   const param = {
//     clientId: 'x',
//     clientSecret: 'x',
//     refreshToken: 'x',
//     taskId: 'task-20-6043928952834',
//   }
//   const data = await getResultFile(param)
//   console.log(data)
// })()

module.exports = getResultFile
