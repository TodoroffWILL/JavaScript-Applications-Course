import * as userService from '../api/user.js';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html``;

export const registerView = (ctx) => {
  ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
};

export const onSubmit = async (ctx, data, e) => {
  if (data.password != data['re-password']) {
    alert('Password does not match !');
    return;
  }
  if (data.password == '' || data['re-password'] == '' || data.email == '') {
    alert('All fields are required');
    return;
  }
  await userService.register(data.email, data.password);

  e.target.reset();
  ctx.page.redirect('/catalog');
};
