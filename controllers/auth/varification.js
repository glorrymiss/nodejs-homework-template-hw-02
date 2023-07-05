const { HttpError } = require("../../helpers")
const {User} = require("../../models/user")

const varification = async(req, res) =>{
const {verificationCode} = req.params

const user = User.findOne({verificationCode})
if(!user){
    throw HttpError(404, "User not found")
}
await User.findByIdAndUpdate(user._id, {verify:true,verificationCode:""})

res.json({
    message: "Verification successful",
})
}

module.exports = varification