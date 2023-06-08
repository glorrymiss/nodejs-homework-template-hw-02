const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactById = await getContactById();
  res.json(contactById);
});

router.post("/", async (req, res, next) => {
  const contactAdd = await addContact();
  res.json(contactAdd);
});

router.delete("/:contactId", async (req, res, next) => {
  const deleteContact = await removeContact();
  res.json(deleteContact);
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
