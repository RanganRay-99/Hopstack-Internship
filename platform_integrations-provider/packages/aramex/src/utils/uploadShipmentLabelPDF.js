const aws = require('aws-sdk')
const config = require('../config/config')

const { bucket, accessKeyId, secretAccessKey, region } = config.s3

aws.config.update({
  accessKeyId,
  secretAccessKey,
  region,
})

const s3 = new aws.S3()

const uploadShipmentLabelPDF = async (stream, shipmentID) => {
  const params = {
    Bucket: bucket,
    Key: `${shipmentID}.pdf`,
    Body: stream,
    ContentType: 'application/octet-stream',
    ACL: 'public-read',
  }

  //Upload the generated file to the Amazon S3 Instance
  return new Promise((resolve, reject) => {
    s3.upload(params, async function (err, data) {
      if (err) {
        return reject(err)
      } else {
        console.log(data)
        resolve(data.Location)
        setTimeout(resolve, 2000)
      }
    })
  })
}

module.exports = uploadShipmentLabelPDF
