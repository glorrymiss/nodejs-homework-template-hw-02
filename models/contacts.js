const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  const readContacts = await readFile(contactsPath);
  const allContacts = JSON.parse(readContacts);
  return allContacts;
};

const getById = async (id) => {
  const contactsList = await listContacts();
  const getContactById = contactsList.find((contact) => contact.id === id);
  return getContactById;
};

const addContact = async ({ name, email, phone }) => {
  const objectContacts = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  const contactsList = await listContacts();
  const newArray = [...contactsList, objectContacts];
  await writeFile(contactsPath, JSON.stringify(newArray, null, 2));
  return objectContacts;
};

const updateContact = async (id, date) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === id);
  contactsList[index] = { id, ...date };

  await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
};

const removeContact = async (id) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
