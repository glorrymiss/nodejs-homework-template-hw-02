const express = require("express");
const ctrl = require("../../controllers/books");
const router = express.Router();
const {
  validateBody,
  validateUpdateBody,
} = require("../../middlewares/validateBody");
const { validScheme } = require("../../schemes/contacts");

router.get("/", ctrl.fnlistContacts);

router.get("/:id", ctrl.fnGetById);

router.post("/", validateBody(validScheme), ctrl.fnAddContact);

router.put("/:id", validateUpdateBody(validScheme), ctrl.fnUpdateContact);

router.delete("/:id", ctrl.fnDeleteContact);

module.exports = router;
