import navBarTemplate from './navbar.js';
import contactListTemplate from './contactList.js';
import { html } from '../../../../node_modules/lit-html/lit-html.js';

const mainTemplate = (data) => html`
  <header>${navBarTemplate(data.addContactHandler)}</header>
  <main>${contactListTemplate(data.contacts)}</main>
`;

export default mainTemplate;
