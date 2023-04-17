import * as userService from '../api/user.js';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onSubmit) => html`>
`;

export const loginView = async (ctx) => {
  ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, e) => {
  if ((data.email == '', data.password == '')) {
    alert('All fields are required !');
    return;
  }

  await userService.login(data.email, data.password);

  e.target.reset();
  ctx.page.redirect('/catalog');
};
