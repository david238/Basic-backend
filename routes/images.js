// whole content copied from users

var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');

const imagesControl = require('../controllers/imagesControl');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  } 
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
  {
    cb(null, true); //accept the file uploaded
  }
  else
  {
    cb(new Error('message'), false); //reject the file uploaded
  }    
};

const upload = multer({storage: storage, limits: {
  filesize: 1024 * 1024 * 5
},
fileFilter: fileFilter}); //add id_user

// POST images
router.post('/', checkAuth, upload.single('productImage'), imagesControl.add_new_image);

/* GET images listing. */
router.get('/', checkAuth, imagesControl.get_all_images);

/* GET IMAGES BY ID */
router.get('/:imageid', checkAuth, imagesControl.search_image_by_id);

module.exports = router;