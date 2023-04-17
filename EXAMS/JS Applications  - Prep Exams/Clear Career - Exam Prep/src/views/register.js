import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (
  onSubmit
) => html` <!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${onSubmit} class="login-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
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

async function onSubmit(ctx, data, e) {
  if (data.password != data['re-password']) {
    alert("Password doesn't match !");
    return;
  }
  if (data.password == '' && data.email == '') {
    alert('All fields are required !');
    return;
  }

  await register(data.email, data.password);

  e.target.reset();
  ctx.page.redirect('/dashboard');
}
