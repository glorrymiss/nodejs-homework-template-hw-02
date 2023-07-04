const { HttpError } = require("../../helpers");
// wrapper try/catch
const { User } = require("../../models/user");
// solt password --- bcrypt.hash
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = `https:${gravatar.url(email)}`;

//   const newUser = await User.create({
//     ...req.body,
//     password: hashPassword,
//     avatarURL
//   });
const newUser = await User.create({
    ...req.body,
    password:hashPassword,
    avatarURL
})
  console.log(newUser);
  console.log(avatarURL);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL
    },
  });
};

module.exports = register;
