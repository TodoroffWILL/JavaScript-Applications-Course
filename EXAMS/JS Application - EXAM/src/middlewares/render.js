// Middlewares are functions that are completed before each page is rendered
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const root = document.querySelector('main');
const header = document.querySelector('header');

const navTemplate = (user) => html` <a id="logo" href="/"
    ><img id="logo-img" src="/images/logo.png" alt=""
  /></a>

  <nav>
    <div>
      <a href="/catalog">Events</a>
    </div>
    ${user
      ? html` <div class="user">
          <a href="/create">Add Event</a>
          <a href="/logout">Logout</a>
        </div>`
      : html` <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
    <!-- Logged-in users -->

    <!-- Guest users -->
  </nav>`;

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header); // Here we renderinging the Navigation first !
  ctx.render = ctxRender;

  next();
}
