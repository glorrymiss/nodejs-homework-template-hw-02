const { HttpError, ctrlWrapper } = require("../helpers");

const Contact = require("../models/contact");

// const {
//   listContacts,
//   getById,
//   removeContact,
//   updateContact,
//   addContact,
// } = require("../models/contacts");

const fnlistContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const fnGetById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactById);
};

const fnAddContact = async (req, res) => {
  const contactAdd = await Contact.create(req.body);
  res.status(201).json(contactAdd);
};

const fnUpdateContact = async (req, res) => {
  const { id } = req.params;
  const updateDate = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updateDate);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updateFavoriteData = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updateFavoriteData);
};

const fnDeleteContact = async (req, res) => {
  const { id } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(id);
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  fnDeleteContact: ctrlWrapper(fnDeleteContact),
};
