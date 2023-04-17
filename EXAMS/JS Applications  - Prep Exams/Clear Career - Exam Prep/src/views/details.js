import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getById, deleteById, getApplicants, apply } from '../api/endPoints.js';

const detailsTemplate = (data, onDelete, applicants, onApply) => html` <section
  id="details"
>
  <div id="details-wrapper">
    <img id="details-img" src="${data.imageUrl}" alt="example1" />
    <p id="details-title">${data.title}</p>
    <p id="details-category">
      Category: <span id="categories">${data.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${Number(data.salary)}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${data.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${data.requirements}</span>
      </div>
    </div>
    <p>Applications: <strong id="applications">${applicants}</strong></p>

    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
      ${data.isOwner
        ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click="${onDelete}" href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >

            <!--Bonus - Only for logged-in users ( not authors )-->
          `
        : nothing}
      ${data.user && !data.isOwner
        ? html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn"
            >Apply</a
          >`
        : nothing}
    </div>
  </div>
</section>`;

export const detailsView = async (ctx) => {
  const currentId = ctx.params.id;
  const [data, applicants] = await Promise.all([
    getById(currentId),
    getApplicants(currentId),
  ]);

  if (ctx.user) {
    const isOwner = ctx.user._id == data._ownerId;
    data.isOwner = isOwner;
    data.user = ctx.user;
  }

  ctx.render(detailsTemplate(data, onDelete, applicants, onApply));
  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${data.title}?`);

    if (confirmed) {
      await deleteById(currentId);
      ctx.page.redirect('/catalog');
    }
  }
  async function onApply() {
    await apply({ currentId });
  }
};
