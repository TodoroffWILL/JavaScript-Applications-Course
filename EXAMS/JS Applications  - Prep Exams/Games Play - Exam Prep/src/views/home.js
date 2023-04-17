import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/games.js';

const gameTemplate = (
  game
) => html`<!-- Display div: with information about every game (if any) -->
  <div class="game">
    <div class="image-wrap">
      <img src="${game.imageUrl}" />
    </div>
    <h3>${game.title}</h3>
    <div class="rating">
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
      <a href="/details/${game._id}" class="btn details-btn">Details</a>
    </div>
  </div> `;

const homeTemplate = (games) => html`<!--Home Page-->
  <section id="welcome-world">
    <div class="welcome-message">
      <h2>ALL new games are</h2>
      <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
      <h1>Latest Games</h1>
      ${games.length == 0
        ? html`<p class="no-articles">No games yet</p>`
        : games.map(gameTemplate)};
    </div>
  </section>`;

export const homeView = async (ctx) => {
  const games = await gameService.getRecent();

  ctx.render(homeTemplate(games));
};
