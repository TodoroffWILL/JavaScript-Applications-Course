import * as api from '../api/endPoints.js';
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

const createTemplate = (onSubmit) => html`<section
  id="create-page"
  class="create"
>
  <form @submit=${onSubmit} id="create-form" action="" method="">
    <fieldset>
      <legend>Add new Book</legend>
      <p class="field">
        <label for="title">Title</label>
        <span class="input">
          <input type="text" name="title" id="title" placeholder="Title" />
        </span>
      </p>
      <p class="field">
        <label for="description">Description</label>
        <span class="input">
          <textarea
            name="description"
            id="description"
            placeholder="Description"
          ></textarea>
        </span>
      </p>
      <p class="field">
        <label for="image">Image</label>
        <span class="input">
          <input type="text" name="imageUrl" id="image" placeholder="Image" />
        </span>
      </p>
      <p class="field">
        <label for="type">Type</label>
        <span class="input">
          <select id="type" name="type">
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Mistery">Mistery</option>
            <option value="Classic">Clasic</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </p>
      <input class="button submit" type="submit" value="Add Book" />
    </fieldset>
  </form>
</section>`;

export const createView = (ctx) => {
  ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, e) {
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }
  await api.create({
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    type: data.type,
  });

  e.target.reset();
  ctx.page.redirect('/');
}
