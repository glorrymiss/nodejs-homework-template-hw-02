const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const fnlistContacts = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(owner);
  // пагінація
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner, favorite: true } : {};
  const allContacts = await Contact.find(filter, "", {
    skip,
    limit,
  }).populate("owner", "email");
  res.status(200).json(allContacts);
};

const fnGetById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById({ _id: id });
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactById);
};

const fnAddContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contactAdd = await Contact.create({ ...req.body, owner });
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
  const deleteContact = await Contact.findByIdAndRemove({ _id: id });
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
