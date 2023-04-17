import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const createTemplate = (onSubmit) => html` `;

export const createView = (ctx) => {
  ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, e) => {
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }
  await dataService.create({
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
