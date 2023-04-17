import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const registerTemplate = (onSubmit) => html` <section
  id="register-page"
  class="register"
>
  <form @submit=${onSubmit} id="register-form" action="" method="">
    <fieldset>
      <legend>Register Form</legend>
      <p class="field">
        <label for="email">Email</label>
        <span class="input">
          <input type="text" name="email" id="email" placeholder="Email" />
        </span>
      </p>
      <p class="field">
        <label for="password">Password</label>
        <span class="input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </span>
      </p>
      <p class="field">
        <label for="repeat-pass">Repeat Password</label>
        <span class="input">
          <input
            type="password"
            name="confirm-pass"
            id="repeat-pass"
            placeholder="Repeat Password"
          />
        </span>
      </p>
      <input class="button submit" type="submit" value="Register" />
    </fieldset>
  </form>
</section>`;

export const registerView = (ctx) => {
  ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, e) {
  if (data.password != data['confirm-pass']) {
    alert("Password doesn't match !");
    return;
  }
  if (data.password == '' || data.email == '' || data['confirm-pass'] == '') {
    alert('All fields are required !');
    return;
  }

  await userService.register(data.email, data.password);

  e.target.reset();
  ctx.page.redirect('/');
}
