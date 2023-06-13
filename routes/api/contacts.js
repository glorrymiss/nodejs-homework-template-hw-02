const express = require("express");
const ctrl = require("../../controllers/books");
const router = express.Router();

router.get("/", ctrl.fnlistContacts);

router.get("/:id", ctrl.fnGetById);

router.post("/", ctrl.fnAddContact);

router.put("/:id", ctrl.fnUpdateContact);

router.delete("/:id", ctrl.fnDeleteContact);

module.exports = router;
