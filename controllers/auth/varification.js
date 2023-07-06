const { HttpError } = require("../../helpers")
const {User} = require("../../models/user")

const varification = async(req, res) =>{
const {verificationToken} = req.params

const user = User.findOne({verificationToken})
if(!user){
  
    throw HttpError(404, "User not found")
}

await User.findOneAndUpdate({verificationToken}, {verify: true, verificationToken:""})

res.json({
    message: "Email verify successful",
})
}

module.exports = varification