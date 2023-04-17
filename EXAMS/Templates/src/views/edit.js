import { html } from '../../node_modules/lit-html/lit-html.js';
import * as itemService from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (currentShoe, onSubmit) => html`
 
`;

export const editView = async (ctx) => {
  const shoeId = ctx.params.id;
  const currentShoe = await itemService.getById(shoeId);

  ctx.render(editTemplate(currentShoe, createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, e) => {
  const shoeId = ctx.params.id;
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }

  await itemService.update(shoeId, {
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
