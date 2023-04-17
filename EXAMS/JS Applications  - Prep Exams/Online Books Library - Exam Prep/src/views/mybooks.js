import * as api from '../api/endPoints.js';
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

const oneTemplate = (book) => html`
  <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <a class="button" href="/details/${book._id}">Details</a>
  </li>
`;

const myBooksTemplate = (currentBook) => html` <section
  id="my-books-page"
  class="my-books"
>
  <h1>My Books</h1>
  <ul class="my-books-list">
    ${currentBook.length != 0
      ? currentBook.map(oneTemplate)
      : html`<p class="no-books">No books in database!</p>`}
    <!-- Display ul: with list-items for every user's books (if any) -->

    <!-- Display paragraph: If the user doesn't have his own books  -->
  </ul>
</section>`;

export const myBooksView = async (ctx) => {
  const userId = ctx.user._id;
  const currentBook = await api.getMyBooks(userId);

  ctx.render(myBooksTemplate(currentBook));
};
