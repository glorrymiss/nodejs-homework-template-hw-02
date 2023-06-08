const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await readFile(contactsPath);
    const allContacts = JSON.parse(readContacts);
    // console.table(allContacts);
    return allContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const getContactById = contactsList.find(
      (contact) => contact.id === contactId
    );
    console.log(getContactById);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const getNewArrayContacts = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    console.log(getNewArrayContacts);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const objectContacts = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };

    const contactsList = await listContacts();
    const newArray = [...contactsList, objectContacts];
    await writeFile(contactsPath, JSON.stringify(newArray, null, 2));
    console.log(objectContacts);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
