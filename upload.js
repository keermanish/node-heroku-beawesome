const multer = require('multer');
const fs = require('fs');
const path = require('path');

/* path to upload dir */
const UPLOAD_PATH = path.join(__dirname, './uploads');

/* funtion to check supported image extensions */
const fileFilter = (req, file, cb) => {
  /* accept image only */
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

/* storge for avatar */
const avatarStorage = multer.diskStorage({
  'destination': `${UPLOAD_PATH}/avatar/`,
  'filename': (req, file, cb) => {
    const uploadedFileName = file.originalname.split('.');
  	const fileName = uploadedFileName[0];
  	const ext = uploadedFileName[1];

    cb(null, `${fileName}-${Date.now()}-avatar.${ext}`);
  }
});

/* required config for avatar upload */
const avatarUpload = multer({
  'storage': avatarStorage,
  'limits': {
		'fileSize': 3000000 /* in bytes 1000000b = 1mb*/
	},
  'onFileSizeLimit': file => {
    /* delete the partially written file */
    fs.unlink(path.join(__dirname, `./../../${file.path}`));
  },
  fileFilter
}).single('avatar');

module.exports = {
  avatarUpload: avatarUpload
};
