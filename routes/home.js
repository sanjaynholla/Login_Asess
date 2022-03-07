const express = require('express')
const router = express.Router();
const { 
    home,
    logout,
    getAllImages,
    storeImage
} = require('../controllers/home')
// Used for storing images
const multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

var upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
        req.fileValidationError = "Forbidden File Extension";
        return cb(null, false, req.fileValidationError);
    }
  }
});

router.route('/').get(home);
router.route('/logout').get(logout);
router.route('/images').get(getAllImages);
router.route('/addimage').post(upload.single('image'), storeImage);

module.exports = router