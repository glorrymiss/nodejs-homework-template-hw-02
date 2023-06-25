const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const { validRegisterSchema, validLoginSchema } = require("../../models/user");
const { isAuthenticate } = require("../../middlewares");

router.post("/register", validateBody(validRegisterSchema), register);

router.post("/login", validateBody(validLoginSchema), login);

router.get("/current", isAuthenticate, getCurrent);

router.post("/logout", isAuthenticate, logout);

module.exports = router;
