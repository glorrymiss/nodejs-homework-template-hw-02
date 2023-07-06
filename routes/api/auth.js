const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  avatarUpdate,
  varification,
  resendVerifyEmail
} = require("../../controllers/auth");

const router = express.Router();
const {
  validRegisterSchema,
  validLoginSchema,
  validStatusSchema,
  validEmailSchema,
} = require("../../models/user");
const { isAuthenticate, isValidId, validateBody, upload  } = require("../../middlewares");



router.post("/register", validateBody(validRegisterSchema), register);


router.get("/verify/:verificationToken", varification )

router.post("/verify", validateBody(validEmailSchema), resendVerifyEmail)

router.post("/login", validateBody(validLoginSchema), login);

router.get("/current", isAuthenticate, getCurrent);

router.post("/logout", isAuthenticate, logout);

router.patch(
  "/:id/subscription",
  isAuthenticate,
  isValidId,
  validateBody(validStatusSchema),
  subscription
);

router.patch("/avatars", isAuthenticate, 
upload.single("avatar"),
 avatarUpdate);

module.exports = router;
