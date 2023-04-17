import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as itemService from '../api/endPoints.js';

const detailsTemplate = (shoe, onDelete) => html``;





export const detailsView = async (ctx) => {
  const shoeId = ctx.params.id;
  const shoes = await itemService.getById(shoeId);

  if (ctx.user) {
    const isOwner = ctx.user._id == shoes._ownerId;
    shoes.isOwner = isOwner;
    shoes.user = ctx.user;
  }
  ctx.render(detailsTemplate(shoes, onDelete));

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete this item ?');
    if (confirmed) {
      await itemService.deleteById(shoeId);
      ctx.page.redirect('/catalog');
    }
  }
};
