import { towns } from './towns.js';
import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('towns');

const template = (towns) =>
  html`<ul>
    ${towns.map((x) => html`<li>${x}</li>`)}
  </ul>`;

render(template(towns), root);

document.querySelector('button').addEventListener('click', search);

function search() {
  const searchText = document.getElementById('searchText').value;
  const allTowns = Array.from(document.querySelectorAll('li'));

  const found = allTowns.filter((x) => x.textContent.includes(searchText));
  if (found.length > 0) {
    found.forEach((x) => {
      x.classList.add('active');
    });
  }
  document.getElementById(
    'result'
  ).textContent = `${found.length} matches found`;
}
