import fs from 'fs'
import path from 'path'

export default {
  uploadImage (file, filename) {
    
    const newFilePath = path.join(__dirname, './../static/' + filename)

    return new Promise((resolve, reject) => {
      fs.readFile(file.path, (err, data) => {
        if (err) return reject(err)
          fs.writeFile(newFilePath, data, (err) => {
            if (err) return reject(err)
              fs.unlink(file.path, (err) => {
                if (err) return reject(err)
                resolve({ file: `/static/${filename}` })
              })
          })
      })
    })

  }
}