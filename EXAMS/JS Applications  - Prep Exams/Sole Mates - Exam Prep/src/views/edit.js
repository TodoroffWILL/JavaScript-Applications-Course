import { html } from '../../node_modules/lit-html/lit-html.js';
import * as shoeService from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (currentShoe, onSubmit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit item</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
          .value=${currentShoe.brand}
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
          .value=${currentShoe.model}
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
          .value=${currentShoe.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
          .value=${currentShoe.release}
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
          .value=${currentShoe.designer}
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
          .value=${Number(currentShoe.value)}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export const editView = async (ctx) => {
  const shoeId = ctx.params.id;
  const currentShoe = await shoeService.getById(shoeId);

  ctx.render(editTemplate(currentShoe, createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, e) => {
  const shoeId = ctx.params.id;
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }

  await shoeService.update(shoeId, {
    brand: data.brand,
    model: data.model,
    imageUrl: data.imageUrl,
    release: data.release,
    designer: data.designer,
    value: data.value,
  });
  e.target.reset();
  ctx.page.redirect('/details/' + shoeId);
};
