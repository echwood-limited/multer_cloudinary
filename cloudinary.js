require('./ES6.js')

const cloudinary = require('cloudinary').v2

function staticValue(value) {
    return function (req, file, cb) {
      cb(null, value)
    }
  }

class CloudinaryStorage {
    constructor(opts) {
        // _.forIn(opts, (value, key) => {
        //     console.log(value)
        //     // if(_.isEmpty(key)) throw 'a field is missing'
        // })
        Object.assign(this, opts)
  }

  _removeFile(req, file, cb) {
    this.drive.delete({
      fileId: file.id
    }, cb)
  }

  async _handleFile(req, file, cb) {
      await cloudinary.uploader.upload(file, function(err, res) {
          if (err) console.log(err)
          cb(null, res)
      })
    // const params = {
    //   resource: {
    //     name: file.originalname,
    //     parents: this.parents
    //   },
    //   media: {
    //     mimeType: this.mimeType,
    //     body: file.stream
    //   },
    //   fields: this.fields
    // }

    // this.drive.files.insert(params, (err, res) => {
    //   if(err) return console.log(err);
    //   console.log(res.data)

    //   cb(null, {
    //     name: res.data.name || this.fileName,
    //     driveId: res.data.id
    //   })
    // })
}
}



  module.exports = (opts) => {
    return new GoogleDriveStorage(opts);
  }