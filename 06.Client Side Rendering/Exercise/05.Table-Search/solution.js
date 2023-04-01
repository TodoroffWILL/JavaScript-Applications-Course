import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { request } from './api.js';

const getUrl = 'jsonstore/advanced/table';
const root = document.querySelector('tbody');

const template = (data) => html`
  ${data.map(
    (x) => html`
      <tr>
        <td>${x.firstName}${x.lastName}</td>
        <td>${x.email}</td>
        <td>${x.course}</td>
      </tr>
    `
  )}
`;

const data = Object.values(await request('GET', getUrl));
render(template(data), root);

document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick(e) {
  const searchText = document.getElementById('searchField').value.trim();

  const allData = Array.from(document.querySelectorAll('td'));

  allData.map((x) => x.classList.remove('select'));

  const found = allData.filter((x) => x.textContent.includes(searchText));

  if (found.length > 0) {
    found.forEach((x) => x.classList.add('select'));
  }
  document.getElementById('searchField').value = '';
}
