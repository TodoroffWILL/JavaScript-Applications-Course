import * as userService from '../api/user.js';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html` <section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="register-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>`;

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
  ctx.page.redirect('/');
};
