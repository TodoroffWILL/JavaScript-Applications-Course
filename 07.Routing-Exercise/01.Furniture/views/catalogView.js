import { render, html } from '../node_modules/lit-html/lit-html.js';

import { get } from '../api.js';
const root = document.querySelector('.container');
const catalogTemplate = (data) => html`<div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">
    ${data.map(
      (x) => html` <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src=${x.img} />
            <p>${x.description}</p>
            <footer>
              <p>Price: <span>${x.price} $</span></p>
            </footer>
            <div>
              <a href="/details/${x._id}" class="btn btn-info">Details</a>
            </div>
          </div>
        </div>
      </div>`
    )}
  </div> `;

export async function catalogView() {
  const data = await get('/data/catalog');
  console.log(data);
  render(catalogTemplate(data), root);
}
