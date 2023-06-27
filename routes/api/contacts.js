const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const {
  validateBody,
  isValidId,
  isAuthenticate,
} = require("../../middlewares");
const { validSchema, validFavoriteSchema } = require("../../models/contact");

router.get("/", isAuthenticate, ctrl.fnlistContacts);

router.get("/:id", isAuthenticate, isValidId, ctrl.fnGetById);

router.post("/", isAuthenticate, validateBody(validSchema), ctrl.fnAddContact);

router.put(
  "/:id",
  isAuthenticate,
  isValidId,
  validateBody(validSchema),
  ctrl.fnUpdateContact
);

router.patch(
  "/:id/favorite",
  isAuthenticate,
  isValidId,
  validateBody(validFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isAuthenticate, ctrl.fnDeleteContact);

module.exports = router;
