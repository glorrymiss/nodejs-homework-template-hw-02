const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const { validSchema, validFavoriteSchema } = require("../../schemes/contacts");
const isValidId = require("../../middlewares/isValidId");

router.get("/", ctrl.fnlistContacts);

router.get("/:id", isValidId, ctrl.fnGetById);

router.post("/", validateBody(validSchema), ctrl.fnAddContact);

router.put("/:id", isValidId, validateBody(validSchema), ctrl.fnUpdateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(validFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", ctrl.fnDeleteContact);

module.exports = router;
