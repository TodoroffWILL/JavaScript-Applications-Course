import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../api/api.js';
import * as shoeService from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const oneTemplate = (shoe) => html` <li class="card">
  <img src="${shoe.imageUrl}" alt="travis" />
  <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
  <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
  <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
</li>`;

const secondTemplate = (shoe) => html` <li class="card">
  <img src="${shoe.imageUrl}" alt="travis" />
  <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
  <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
  <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
  <a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>`;

const searchTemplate = (result, onSearch) => html` <section id="search">
  <h2>Search by Brand</h2>

  <form @submit=${onSearch} class="search-wrapper cf">
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

  <div id="search-container">
    <ul class="card-wrapper">
      ${result.length === 0 ? html`<h2>There are no results found.</h2>` : ''}
      ${result.user ? result.map(secondTemplate) : result.map(oneTemplate)}
      <!-- Display a li with information about every post (if any)-->
    </ul>

    <!-- Display an h2 if there are no posts -->
    <!--  -->
  </div>
</section>`;

export const searchView = async (ctx) => {
  const query = ctx.querystring.split('=')[1];
  const shoeList =
    query == undefined
      ? []
      : await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
  if (ctx.user) {
    shoeList.user = ctx.user;
  }
  ctx.render(searchTemplate(shoeList, createSubmitHandler(ctx, onSearch)));

  async function onSearch(ctx, data, e) {
    e.target.reset();
    ctx.page.redirect(`/search?query=${data.search}`);
  }
};
