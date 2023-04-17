import * as api from '../api/endPoints.js';
import { html } from '../../node_modules/lit-html/lit-html.js';

const oneTemplate = (book) => html`
  <!-- Display ul: with list-items for All books (If any) -->

  <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <a class="button" href="/details/${book._id}">Details</a>
  </li>
`;

const homeTemplate = (books) => html`<section
  id="dashboard-page"
  class="dashboard"
>
  <h1>Dashboard</h1>
  <ul class="other-books-list">
  ${
    books.length > 0
      ? books.map(oneTemplate)
      : html`<p class="no-books">No books in database!</p>`
  }
  <!-- Display paragraph: If there are no books in the database -->
</section></ul>`;

export const homeView = async (ctx) => {
  const books = await api.getAll();

  ctx.render(homeTemplate(books));
};
