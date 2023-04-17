import { html } from '../../node_modules/lit-html/lit-html.js';
import * as api from '../api/endPoints.js';

const oneTemplate = (event) => html`<div class="event">
  <img src="${event.imageUrl}" alt="example1" />
  <p class="title">${event.name}</p>
  <p class="date">${event.date}</p>
  <a class="details-btn" href="/details/${event._id}">Details</a>
</div>`;

const catalogTemplate = (events) => html`<h2>Current Events</h2>
  <section id="dashboard">
    ${events.length > 0
      ? events.map(oneTemplate)
      : html` <h4>No Events yet.</h4>`}

    <!-- Display a div with information about every post (if any)-->
  </section> `;

export const catalogView = async (ctx) => {
  const events = await api.getAll();

  ctx.render(catalogTemplate(events));
};
