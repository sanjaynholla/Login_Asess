const express = require('express')
const router = express.Router();
const { 
    home,
    logout,
    getAllImages,
    storeImage
} = require('../controllers/home')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })


router.route('/').get(home);
router.route('/logout').get(logout);
router.route('/images').get(getAllImages);
router.route('/addimage').post(upload.single('images'), storeImage);

module.exports = router