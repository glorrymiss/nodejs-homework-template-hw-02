const { ctrlWrapper } = require("../../helpers");
const getCurrent = require("../auth/current");
const login = require("../auth/login");
const register = require("../auth/register");
const logout = require("../auth/logout");
const subscription = require("../auth/subscription");
const avatarUpdate = require("../auth/avatars");
const varification = require("../auth/varification")
const resendVerifyEmail = require("../auth/resendEmail")

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  logout: ctrlWrapper(logout),
  subscription: ctrlWrapper(subscription),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  varification: ctrlWrapper(varification),
  resendVerifyEmail:ctrlWrapper(resendVerifyEmail)
}

