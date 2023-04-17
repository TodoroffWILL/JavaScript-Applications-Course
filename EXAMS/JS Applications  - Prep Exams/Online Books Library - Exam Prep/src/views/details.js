import * as api from '../api/endPoints.js';
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';

const detailsTemplate = (
  book,
  onDelete,
  likes,
  onLike,
  didUserLiked
) => html` <section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <div class="actions">
      <!-- Edit/Delete buttons ( Only for creator of this book )  -->

      ${book.isOwner
        ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)"
              >Delete</a
            >`
        : nothing}
      <!-- Bonus -->
      <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->

      ${book.user && !book.isOwner
        ? html`
            <div class="likes">
              <img class="hearts" src="/images/heart.png" />
              <span id="total-likes">Likes: ${likes}</span>
            </div>
            ${!didUserLiked
              ? html`<a
                  @click=${onLike}
                  class="button"
                  href="javascript:void(0)"
                  >Like</a
                >`
              : nothing}
          `
        : html` <div class="likes">
            <img class="hearts" src="/images/heart.png" />
            <span id="total-likes">Likes: ${likes}</span>
          </div>`}

      <!-- ( for Guests and Users )  -->

      <!-- Bonus -->
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export const detailsView = async (ctx) => {
  const bookId = ctx.params.id;
  const userId = getUserData()?._id;

  const [book, likes] = await Promise.all([
    api.getById(bookId),
    api.getLikes(bookId),
  ]);
  const didUserLiked = userId && (await api.userLikes(bookId, userId));
  if (ctx.user) {
    const isOwner = ctx.user._id == book._ownerId;
    book.isOwner = isOwner;
    book.user = ctx.user;
  }
  console.log(book.user);
  ctx.render(detailsTemplate(book, onDelete, likes, onLike, didUserLiked));
  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${book.title}?`);

    if (confirmed) {
      await api.deleteById(bookId);
      ctx.page.redirect('/');
    }
  }
  async function onLike() {
    await api.postLike({ bookId });
    ctx.page.redirect(`/details/${bookId}`);
  }
};
