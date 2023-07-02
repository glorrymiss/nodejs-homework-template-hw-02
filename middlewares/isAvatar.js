const multer = require("multer");
const path = require("path");

const pathDir = path.join(__dirname,"../", "tpm");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  imageOptions: {
    resize: { width: 250, height: 250 },
  },
})
 
 const upload = multer({
    storage: storage,
  });



module.exports = upload;
