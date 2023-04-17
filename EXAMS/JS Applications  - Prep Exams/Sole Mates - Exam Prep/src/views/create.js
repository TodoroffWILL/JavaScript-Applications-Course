import { html } from '../../node_modules/lit-html/lit-html.js';
import * as shoeService from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const createTemplate = (onSubmit) => html` <section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" id="shoe-model" placeholder="Model" />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
      />
      <input type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export const createView = (ctx) => {
  ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, e) => {
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }
  await shoeService.create({
    brand: data.brand,
    model: data.model,
    imageUrl: data.imageUrl,
    release: data.release,
    designer: data.designer,
    value: data.value,
  });

  e.target.reset();
  ctx.page.redirect('/catalog');
};
