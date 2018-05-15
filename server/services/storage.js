import fs from 'fs'
import AWS from 'aws-sdk'

import AppError from './../errors/AppError'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

export default {
  uploadImage (file, name) {
    return new Promise((resolve, reject) => {

      if (!file || !name) return reject(new AppError('Missing file or filename', 400))
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') return reject(new AppError('Only data type image/png allowed', 400))

      fs.readFile(file.path, (err, data) => {

        if (err) return reject(new AppError(err.message, 500))
        if (!data) return reject(new AppError('The file is empty', 400))
        s3.upload({
          Key: name,
          Body: data,
          ContentType: file.type,
          Bucket: process.env.AWS_BUCKET
        }, (err, data) => {
          console.log('AWS S3 data', data)
          if (err) return reject(new AppError(err.message, 500))
          if (data) return resolve({ location: data.Location, key: data.Key })
          reject(new AppError('Unexpected error', 500))
        })

      })

    })
  }
}