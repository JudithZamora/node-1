const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const yargs = require('yargs');

const argv = yargs
  .option('action', {
    alias: 'a',
    describe: 'Action to perform',
    choices: ['list', 'get', 'add', 'remove'],
    demandOption: true,
  })
  .option('id', {
    alias: 'i',
    describe: 'Contact ID',
  })
  .option('name', {
    alias: 'n',
    describe: 'Contact name',
  })
  .option('email', {
    alias: 'e',
    describe: 'Contact email',
  })
  .option('phone', {
    alias: 'p',
    describe: 'Contact phone number',
  })
  .help()
  .argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log('Contacts:', listContacts());
      break;

    case 'get':
      if (id) {
        console.log(`Contact with ID ${id}:`, getContactById(id));
      } else {
        console.error('ID is required for get action.');
      }
      break;

    case 'add':
      try {
        const newContact = addContact(name, email, phone);
        console.log('New contact added:', newContact);
      } catch (error) {
        console.error('Error adding contact:', error.message);
      }
      break;

    case 'remove':
      if (id) {
        console.log(`Deleting contact with ID ${id}`);
        removeContact(id);
      } else {
        console.error('ID is required for remove action.');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
