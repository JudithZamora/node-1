const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function readContactsFile() {
  try {
    const fileContents = fs.readFileSync(contactsPath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading contacts file:', error.message);
    return [];
  }
}

function writeContactsFile(contacts) {
  try {
    const fileContents = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(contactsPath, fileContents, 'utf-8');
  } catch (error) {
    console.error('Error writing contacts file:', error.message);
  }
}

function listContacts() {
  const contacts = readContactsFile();
  return contacts;
}

function getContactById(contactId) {
  const contacts = readContactsFile();
  return contacts.find(contact => contact.id === contactId);
}

function removeContact(contactId) {
  let contacts = readContactsFile();
  contacts = contacts.filter(contact => contact.id !== contactId);
  writeContactsFile(contacts);
}

function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    throw new Error('Name, email, and phone are required.');
  }
  const contacts = readContactsFile();
  const newContact = {
    id: generateId(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  writeContactsFile(contacts);
  return newContact;
}

function generateId() {
  return Date.now().toString();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
