import { html } from '../../node_modules/lit-html/lit-html.js';
import * as api from '../api/endPoints.js';

const oneTemplate = (singleData) => html``;

const catalogTemplate = (datas) => html` `;

export const catalogView = async (ctx) => {
  const shoes = await api.getAll();

  ctx.render(catalogTemplate(shoes));
};
