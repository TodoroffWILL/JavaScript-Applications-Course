import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as shoeService from '../api/endPoints.js';

const detailsTemplate = (shoe, onDelete) => html` <section id="details">
  <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
      <img src="${shoe.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
      <p>Model: <span id="details-model">${shoe.model}</span></p>
      <p>Release date: <span id="details-release">${shoe.release}</span></p>
      <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
      <p>Value: <span id="details-value">${shoe.value}</span></p>
    </div>

    <!--Edit and Delete are only for creator-->
    ${shoe.isOwner
      ? html`<div id="action-buttons">
          <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
            >Delete</a
          >
        </div>`
      : nothing}
  </div>
</section>`;

export const detailsView = async (ctx) => {
  const shoeId = ctx.params.id;
  const shoes = await shoeService.getById(shoeId);

  if (ctx.user) {
    const isOwner = ctx.user._id == shoes._ownerId;
    shoes.isOwner = isOwner;
    shoes.user = ctx.user;
  }
  ctx.render(detailsTemplate(shoes, onDelete));

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete this item ?');
    if (confirmed) {
      await shoeService.deleteById(shoeId);
      ctx.page.redirect('/catalog');
    }
  }
};
