// Middlewares are functions that are completed before each page is rendered
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('site-content');
const header = document.querySelector('#site-header');

const navTemplate = (user) => html` <!-- Navigation -->
  <!-- Navigation -->
  <nav class="navbar">
    <section class="navbar-dashboard">
      <a href="/">Dashboard</a>
      <!-- Guest users -->
      ${user
        ? html`<div id="user">
            <span>Welcome, ${user.email}</span>
            <a class="button" href="/mybooks">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
          </div>`
        : html`<div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
          </div>`}

      <!-- Logged-in users -->
    </section>
  </nav>`;

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header); // Here we renderinging the Navigation first !
  ctx.render = ctxRender;

  next();
}
