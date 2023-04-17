import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/endPoints.js';

const oneTemplate = (data) => html`
  <section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    <div class="offer">
      <img src="${data.imageUrl}" alt="example1" />
      <p><strong>Title: </strong><span class="title">${data.title}</span></p>
      <p>
        <strong>Salary:</strong
        ><span class="salary">${Number(data.salary)}</span>
      </p>
      <a class="details-btn" href="/details/${data._id}">Details</a>
    </div>

    <!-- Display an h2 if there are no posts -->
  </section>
`;

const catalogTemplate = (datas) => html`
  ${datas.length > 0 ? datas.map(oneTemplate) : html`<h2>No offers yet.</h2>`}
`;

export const catalogView = async (ctx) => {
  const data = await getAll();

  ctx.render(catalogTemplate(data));
};
