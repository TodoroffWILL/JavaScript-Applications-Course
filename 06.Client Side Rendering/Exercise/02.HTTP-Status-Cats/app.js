import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const section = document.getElementById('allCats');

const template = (cats) =>
  html`
    <ul>
      ${cats.map(
        (x) => html`
          <li>
            <img
              src="./images/${x.imageLocation}.jpg"
              width="250"
              height="250"
              alt="Card image cap"
            />
            <div class="info">
              <button class="showBtn" @click=${(e) => showDetails(e)}>
                Show status code
              </button>
              <div class="status" style="display: none" id="${x.id}">
                <h4>Status Code: ${x.statusCode}</h4>
                <p>${x.statusMessage}</p>
              </div>
            </div>
          </li>
        `
      )}
    </ul>
  `;

// Adding click listenr on every card
render(template(cats), section);

function showDetails(e) {
  e.target.textContent === 'Hide status code'
    ? (e.target.textContent = 'Show status code')
    : (e.target.textContent = 'Hide status code');
  e.target.nextElementSibling.style.display === 'none'
    ? (e.target.nextElementSibling.style = 'display: block')
    : (e.target.nextElementSibling.style = 'display: none');
}
