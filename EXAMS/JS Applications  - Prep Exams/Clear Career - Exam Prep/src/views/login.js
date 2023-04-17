import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onSubmit) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit="${onSubmit}" class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;

export const loginView = async (ctx) => {
  ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, e) {
  if ((data.email == '', data.password == '')) {
    alert('All fields are required !');
    return;
  }

  await login(data.email, data.password);

  e.target.reset();
  ctx.page.redirect('/catalog');
}
