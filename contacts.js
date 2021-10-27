const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const id = Number(contactId);
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
}

async function removeContact(contactId) {
  const id = Number(contactId);
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== id);
  const result = JSON.stringify(newContacts);
  await fs.writeFile(contactsPath, result);
  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = contacts[contacts.length - 1].id + 1;
  const newContact = {
    name,
    email,
    phone,
    id: id,
  };
  contacts.push(newContact);
  const result = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, result);
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
