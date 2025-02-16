const aws = require('aws-sdk')
const s3 = new aws.S3()
const { accessKeyId, secretAccessKey, region, s3Bucket } = require('../config/config').aws

aws.config.update({
  accessKeyId,
  secretAccessKey,
  region,
})

const uploadShipmentLabelPNG = async (stream, shipmentID) => {
  {
    const params = {
      Bucket: s3Bucket,
      Key: `${shipmentID}.png`,
      Body: stream,
      ContentType: 'application/octet-stream',
      ACL: 'public-read',
    }

    //Upload the generated file to the Amazon S3 Instance
    return new Promise((resolve, reject) => {
      s3.upload(params, async function (err, data) {
        if (err) {
          console.log(err)
          return reject(err)
        } else {
          console.log(data)
          return resolve(data.Location)
        }
      })
    })
  }
}

module.exports = uploadShipmentLabelPNG
