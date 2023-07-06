const { HttpError, sendEmail } = require("../../helpers");
const {User} = require("../../models/user")
require("dotenv").config();


const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res)=>{

  const {email} = req.body;
  const user = await User.findOne({email})
  if(!user){
    throw HttpError(400, "missing required field email")
  }
  if(user.verify){
    throw HttpError(400, "Verification has already been passed")
  }
  const verificateEmail = {
    to:email,
    subject: "Verify email",
    html:`<a target="_blank" href="${BASE_URL}/users/verify/:${user.verificationToken}">Click on email</a>`
 }
 await sendEmail(verificateEmail)
 
 res.json({
    message:"Verify email send success"
 })
}

module.exports = resendVerifyEmail