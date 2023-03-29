import contactTemplate from './contact.js';
import { html } from '../../../../node_modules/lit-html/lit-html.js';

const contactListTemplate = (contacts) => {
  return html`
  <div
    class="contact-list"
    style="display:flex; justify-content: space-around"
  >
    ${contacts.map((x) => contactTemplate(x))}
  </div>`;
};
export default contactListTemplate;
