import { html } from '../../node_modules/lit-html/lit-html.js';
import * as eventService from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (currentEvent, onSubmit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Event</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Event"
        .value=${currentEvent.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder="Event Image"
        .value=${currentEvent.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder="Category"
        .value=${currentEvent.category}
      />

      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
      >
${currentEvent.description}</textarea
      >

      <label for="date-and-time">Event Time:</label>
      <input
        type="text"
        name="date"
        id="date"
        placeholder="When?"
        .value=${currentEvent.date}
      />

      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export const editView = async (ctx) => {
  const eventId = ctx.params.id;
  const currentEvent = await eventService.getById(eventId);

  ctx.render(editTemplate(currentEvent, createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, e) => {
  const eventId = ctx.params.id;
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }

  await eventService.update(eventId, {
    name: data.name,
    imageUrl: data.imageUrl,
    category: data.category,
    description: data.description,
    date: data.date,
  });
  e.target.reset();
  ctx.page.redirect('/details/' + eventId);
};
