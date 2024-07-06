const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_KEY,
  // api_secret: process.env.CLOUD_SECRET

  cloud_name: 'dw0niuzdf',
  api_key: '862679367621591',
  api_secret: 'wO63g36BhGNYjbvrhtfbfbwxXz8'
});

module.exports.upload = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.url;
        console.log('Upload result:', result);
        next();
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send(`Error uploading file: ${error.message}`);
      }
    }

    upload(req);
  }
  else {
    next();
  }
}