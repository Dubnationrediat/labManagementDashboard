import multer from 'multer';

// Define storage settings for images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Resources/gasBills'); 
    },
    filename: function (req, file, cb) {
    
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileChecker = function (req, file, cb) {
    
    if (
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/png' &&
        file.mimetype !== 'image/gif'
    ) {
        return cb(new Error('Only JPG, PNG, and GIF files are allowed'));
    }
    cb(null, true);
};

const imageUploader = multer({
    storage: storage,
    fileFilter: fileChecker
});

export default imageUploader;
