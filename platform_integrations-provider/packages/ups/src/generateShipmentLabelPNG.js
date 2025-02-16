const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const uploadShipmentLabelPNG = require('./utils/uploadShipmentLabelPNG')

const generateShipmentLabelPNG = async (params) => {
  const { ShipmentResponse } = params
  let base64String = ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage
  const responce = {}
  loadImage(Buffer.from(base64String, 'base64'))
    .then(async (img) => {
      const canvas = createCanvas(img.width, img.height, 'png')

      const ctx = canvas.getContext('2d')

      ctx.drawImage(img, 0, 0, img.width, img.height)
      const base64image = canvas.toBuffer()

      try {
        // Upload the UPS Shipment Label
        const fileUrl = await uploadShipmentLabelPNG(base64image, ShipmentResponse.ShipmentIdentificationNumber)
        // const fileUrl = await uploadShipmentLabelPNG(base64image, params.body.shipment.shipmentID)
        responce.label_url = fileUrl
      } catch (err) {
        console.log(err)
        return err
      }
    })
    .then(() => responce.label_url)
}

module.exports = generateShipmentLabelPNG
