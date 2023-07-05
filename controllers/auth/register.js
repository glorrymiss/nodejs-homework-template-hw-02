const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const {nanoid}= require("nanoid")
require("dotenv").config();


const {BASE_URL} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = `https:${gravatar.url(email)}`;
  const verificationToken = nanoid()

const newUser = await User.create({
    ...req.body,
    password:hashPassword,
    avatarURL, verificationToken
})
 const verificateEmail = {
    to:email,
    subject: "Verify email",
    html:`<a target="_blank" href="${BASE_URL}/users/verify/:${verificationToken}">Click on email</a>`
 }

 await sendEmail(verificateEmail)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL
    },
  });
};

module.exports = register;
