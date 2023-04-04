import { html } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../api/recipe.js';

const detailsTemplate = (recipe) => html` <section id="details">
  <article>
    <h2>${recipe.name}</h2>
    <div class="band">
      <div class="thumb"><img src="${recipe.img}" /></div>
      <div class="ingredients">
        <h3>Ingredients:</h3>
        <ul>
          ${recipe.ingredients.map((x) => html`<li>${x}</li>`)}
        </ul>
      </div>
    </div>
    <div class="description">${recipe.steps.map((x) => html`<p>${x}</p>`)}</div>

    <div class="controls">
      <a class="actionLink" href="/edit/${recipe._id}">✎ Edit</a>
      <a class="actionLink" href="javascript:void(0)">✖ Delete</a>
    </div>
  </article>
</section>`;

export async function detailsPage(ctx) {
  const recipe = ctx.recipe;
  ctx.render(detailsTemplate(recipe));
}


