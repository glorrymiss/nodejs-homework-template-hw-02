const multer = require("multer");
const path = require("path");

const pathDir = path.join(__dirname,"../", "tpm");

const multerConfig = multer.diskStorage({
  destination: pathDir,
  
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
 
})
 
 const upload = multer({
    storage: multerConfig,
  });



module.exports = upload;
