
import { createRecipe } from './api.js';

const createSection = document.querySelector('.create');
const createForm = createSection.querySelector('form');

createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let name = formData.get('name');
  let img = formData.get('img');
  let ingredients = formData.get('ingredients').split('\n');
  let steps = formData.get('steps').split('\n');

  let data = {
    name,
    img,
    ingredients,
    steps,
  };

  createRecipe(data).then((data) => {
    console.log(data);
    alert('Succesful recipe create');
  });
});

export function create() {
  createSection.style.display = 'block';
}
