import { getContacts } from './api.js';
import { render } from '../../../node_modules/lit-html/lit-html.js';
import mainTemplate from './templates/main.js';

const rootElement = document.getElementById('root');

const contacts = await getContacts();

render(mainTemplate({ contacts, addContactHandler }), rootElement);

// Dont do, not good practice !
function addContactHandler() {
  fetch('http://localhost:3030/jsonstore/contacts', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ person: 'Adelin', phone: '088912346' }),
  })
    .then((res) => res.json())
    .then((contact) =>
      render(mainTemplate({ contacts: [...contacts, contact] }), rootElement)
    );
}
