import { html, render } from '../node_modules/lit-html/lit-html.js';

const createArticleHandler = (ctx, e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let { title, content, author } = Object.fromEntries(formData);

  fetch('http://localhost:3030/jsonstore/articles', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ title, content, author }),
  })
    .then((res) => res.json())
    .then((article) => ctx.page.redirect(`/articles/${article._id}`));
};

const createTemplate = (ctx) =>
  html` <form @submit=${createArticleHandler.bind({}, ctx)}>
    <div>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />
    </div>

    <div>
      <label htmlFor="content">Content</label>
      <textarea name="content" id="content" cols="30" rows="10"></textarea>
    </div>

    <div>
      <label htmlFor="author">Author</label>
      <input type="text" name="author" id="author" />
    </div>

    <div>
      <input type="submit" value="Create" />
    </div>
  </form>`;

const root = document.getElementById('root');

export const createView = (ctx) => render(createTemplate(ctx), root);
