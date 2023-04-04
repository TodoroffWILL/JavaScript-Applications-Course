import { html } from '../../node_modules/lit-html/lit-html.js';

const registerTemplate = () => html` <section id="register">
  <article>
    <h2>Register</h2>
    <form id="registerForm">
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <label>Repeat: <input type="password" name="rePass" /></label>
      <input type="submit" value="Register" />
    </form>
  </article>
</section>`;

export function registerPage(ctx) {
  ctx.render(registerTemplate());
}
