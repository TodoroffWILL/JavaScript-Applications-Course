import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/games.js';
import { commentsView } from './comments.js';
import { commentFormView } from './commentForm.js';

const detailsTemplate = (
  game,
  commentsSection,
  commentFormSection,
  onDelete
) => html`
  <!--Details Page-->
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>

      <p class="text">${game.summary}</p>

      <!-- comments should be here-->
      ${commentsSection}
      <!-- Edit/Delete buttons ( Only for creator of this game )  -->
      ${game.isOwner
        ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button"
              >Delete</a
            >
            <!--javascript:void(0) means it prevents from adding # to the address and prevent default on the <a> tag-->
          </div>`
        : nothing}
    </div>

    ${commentFormSection}
    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
  </section>
`;

export const detailsView = async (ctx) => {
  const gameId = ctx.params.id;

  const [game, commentsSection] = await Promise.all([
    gameService.getById(gameId),
    commentsView(gameId),
  ]);

  if (ctx.user) {
    const isOwner = ctx.user._id == game._ownerId;
    game.isOwner = isOwner;
  }
  const commentFormSection = commentFormView(ctx, game.isOwner);

  ctx.render(
    detailsTemplate(game, commentsSection, commentFormSection, onDelete)
  );

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${game.title}?`);

    if (confirmed) {
      await gameService.deleteById(gameId);
      ctx.page.redirect('/');
    }
  }
};

// Create comment

/*
  </section>*/
