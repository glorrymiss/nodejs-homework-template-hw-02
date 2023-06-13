const { HttpError, ctrlWrapper } = require("../helpers");
const Joi = require("joi");
const {
  listContacts,
  getById,
  removeContact,
  updateContact,
  addContact,
} = require("../models/contacts");

const ValidSheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const fnlistContacts = async (req, res) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};

const fnGetById = async (req, res) => {
  const { id } = req.params;
  const contactById = await getById(id);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactById);
};

const fnAddContact = async (req, res) => {
  const { error } = ValidSheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const contactAdd = await addContact(req.body);
  res.status(201).json(contactAdd);
};

const fnUpdateContact = async (req, res) => {
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
};

const fnDeleteContact = async (req, res) => {
  const { id } = req.params;
  const deleteContact = await removeContact(id);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = {
  fnlistContacts: ctrlWrapper(fnlistContacts),
  fnGetById: ctrlWrapper(fnGetById),
  fnAddContact: ctrlWrapper(fnAddContact),
  fnUpdateContact: ctrlWrapper(fnUpdateContact),
  fnDeleteContact: ctrlWrapper(fnDeleteContact),
};
