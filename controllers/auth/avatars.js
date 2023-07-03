const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");



const pathAvatars = path.join(__dirname,"../../", "public", "avatars")

const avatarUpdate = async(req, res) =>{
        const { _id } = req.user;

        const { path: tempUpload, originalname } = req.file;

        await Jimp.read(tempUpload) 
        .then((image) => {
          return image.resize(250, 250).write(tempUpload); 
        }) 
        .catch((error) => { 
          throw error; 
        });
     

        const fileName = `${_id}_${originalname}`
        const resultUpload = path.join(pathAvatars, fileName);

        await fs.rename(tempUpload, resultUpload);
      
        const avatarURL = path.join("avatars", fileName);
     
       await User.findByIdAndUpdate(_id, { avatarURL });
      
        res.status(201).json(
       {avatarURL}
        );}


module.exports = avatarUpdate
