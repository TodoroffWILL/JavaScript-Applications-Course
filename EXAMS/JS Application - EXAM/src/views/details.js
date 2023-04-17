import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as eventService from '../api/endPoints.js';
import { getUserData } from '../util.js';

const detailsTemplate = (
  event,
  onDelete,
  goings,
  onGoing,
  didUserWent
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${event.imageUrl}" alt="example1" />
    <p id="details-title">${event.name}</p>
    <p id="details-category">
      Category: <span id="categories">${event.category}</span>
    </p>
    <p id="details-date">Date:<span id="date">${event.date}</span></p>
    <div id="info-wrapper">
      <div id="details-description">
        <span>${event.description}</span>
      </div>
    </div>

    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
      ${event.isOwner
        ? html`<a href="/edit/${event._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >`
        : nothing}
      ${event.user && !event.isOwner
        ? html`<h3>Going: <span id="go">${goings}</span> times.</h3>
            ${!didUserWent
              ? html`<a @click=${onGoing} href="javascript:void(0)" id="go-btn"
                  >Going</a
                >`
              : nothing}`
        : html`<h3>Going: <span id="go">${goings}</span> times.</h3>`}
      <!--Bonus - Only for logged-in users ( not authors )-->
    </div>
  </div>
</section>`;

export const detailsView = async (ctx) => {
  const eventId = ctx.params.id;
  const userId = getUserData()?._id;

  const [events, goings] = await Promise.all([
    eventService.getById(eventId),
    eventService.getGoings(eventId),
  ]);
  const didUserWent = userId && (await eventService.peopleGoing(eventId, userId));
  if (ctx.user) {
    const isOwner = ctx.user._id == events._ownerId;
    events.isOwner = isOwner;
    events.user = ctx.user;
  }
  ctx.render(detailsTemplate(events, onDelete, goings, onGoing, didUserWent));

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete this event ?');
    if (confirmed) {
      await eventService.deleteById(eventId);
      ctx.page.redirect('/catalog');
    }
  }
  async function onGoing() {
    await eventService.postGoing({ eventId });
    ctx.page.redirect(`/details/${eventId}`);
  }
};
