import { html, render } from '../../node_modules/lit-html/lit-html.js';
import {  navigationView } from '../views/navigationView.js';

const root = document.querySelector('#root');
const ctxRender = (ctx, templateResult) => {
  let layout = html`
    <nav>${navigationView(ctx)}</nav>
    <main>${templateResult}</main>
  `;

  render(layout, root);
};

export const renderMiddleware = (ctx, next) => {
  ctx.render = ctxRender.bind(null, ctx);

  next();
};
