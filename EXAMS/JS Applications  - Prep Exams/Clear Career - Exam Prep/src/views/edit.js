import { html } from '../../node_modules/lit-html/lit-html.js';
import { update, getById } from '../api/endPoints.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (data, onSubmit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Offer</h2>
    <form @submit="${onSubmit}" class="edit-form">
      <input type="text" name="title" id="job-title" .value=${data.title} />
      <input
        type="text"
        name="imageUrl"
        id="job-logo"
        .value=${data.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="job-category"
        .value=${data.category}
      />
      <textarea
        id="job-description"
        name="description"
        rows="4"
        cols="50"
        .value=${data.description}
      ></textarea>
      <textarea
        id="job-requirements"
        name="requirements"
        rows="4"
        cols="50"
        .value=${data.requirements}
      ></textarea>
      <input type="text" name="salary" id="job-salary" .value=${data.salary} />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export const editView = async (ctx) => {
  const currentId = ctx.params.id;
  const data = await getById(currentId);
  ctx.render(editTemplate(data, createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, e) {
  const currentId = ctx.params.id;
  if (Object.values(data).some((x) => x == '')) {
    return alert('All fiends are required!');
  }
  await update(currentId, {
    title: data.title,
    imageUrl: data.imageUrl,
    category: data.category,
    description: data.description,
    requirements: data.requirements,
    salary: data.salary,
  });
  e.target.reset();
  ctx.page.redirect('/details/' + currentId);
}
