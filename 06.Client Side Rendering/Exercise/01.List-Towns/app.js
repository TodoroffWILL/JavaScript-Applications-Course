import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const template = (data) =>
  html`<ul>
    ${data.map((x) => html`<li>${x}</li>`)}
  </ul>`;

document.getElementById('btnLoadTowns').addEventListener('click', (e) => {
  e.preventDefault();

  const data = document.getElementById('towns').value.split(', ');
  render(template(data), root);

  document.getElementById('towns').value = '';
});
