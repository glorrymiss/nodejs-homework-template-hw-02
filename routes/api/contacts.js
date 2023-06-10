const express = require("express");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

const {
  listContacts,
  getById,
  removeContact,
  updateContact,
  addContact,
} = require("../../models/contacts");

const ValidSheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await getById(id);
    if (!contactById) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = ValidSheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contactAdd = await addContact(req.body);
    res.status(201).json(contactAdd);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = ValidSheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const updateDate = await updateContact(id, req.body);

    if (!updateDate) {
      throw HttpError(404, "missing fields");
    }
    res.status(200).json(updateDate);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteContact = await removeContact(id);
    if (!deleteContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
