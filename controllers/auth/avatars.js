const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");

const pathAvatars = path.join(__dirname,"../../", "public", "avatars")
console.log(pathAvatars);
const avatarUpdate = async(req, res) =>{
        const { _id } = req.user;

      
        const { path: tempUpload, originalname } = req.file;
      
        const resultUpload = path.join(pathAvatars, originalname);
      
        await fs.rename(tempUpload, resultUpload);
      
        const avatarURL = path.join("avatars", originalname);
      console.log(avatarURL);
      await User.findByIdAndUpdate(_id, { avatarURL });
      
        res.status(201).json(
       {avatarURL}
        );
}

module.exports = avatarUpdate;
