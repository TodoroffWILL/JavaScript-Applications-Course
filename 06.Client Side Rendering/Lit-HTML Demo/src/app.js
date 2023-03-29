import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const template = (items, styleClass, ) => html`
  <h1>Hello From Lit HTML</h1>

  ${items.length == 0 ? html`<p>No Users</p>` : ''}

  <ul class=${styleClass}>
    ${items.map((x) => html`<li>${x}</li>`)}
  </ul>
  <input type="text" value=${''} />
  <button ?disabled=${items.length > 6} @click=${(e) => onClick()}>Add</button>
`;
const names = ['Doncho', 'Adelin', 'Eva', 'Mariyka'];
const root = document.getElementById('root');
const templateResult = template(names, 'vertical');

render(templateResult, root);

function onClick() {
  names.push('Doncho -' + Math.random());
  render(template(names, 'vertical', false), root);
}
