const express = require("express");
const ctrl = require("../../controllers/books");
const router = express.Router();
const {
  validateBody,
  validateUpdateBody,
} = require("../../middlewares/validateBody");
const { validSchema, validFavoriteSchema } = require("../../schemes/contacts");

router.get("/", ctrl.fnlistContacts);

router.get("/:id", ctrl.fnGetById);

router.post("/", validateBody(validSchema), ctrl.fnAddContact);

router.put("/:id", validateUpdateBody(validSchema), ctrl.fnUpdateContact);

router.patch(
  "/:id/favorite",
  validateUpdateBody(validFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", ctrl.fnDeleteContact);

module.exports = router;
