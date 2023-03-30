import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const getUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getOptions() {
  try {
    const response = await fetch(getUrl);
    if (!response.ok) {
      throw new Error(response.message);
    }
    return await response.json();
  } catch (error) {
    alert(error.message);
  }
}

const template = (data) => html`
  ${data.map((el) => html`<option value=${el._id}>${el.text}</option>`)}
`;

const options = Object.values(await getOptions());
const root = document.getElementById('menu');

// Add new Element

document.querySelector('form').addEventListener('submit', addItem);

async function addItem(e) {
  e.preventDefault();
  const text = document.getElementById('itemText').value;
  try {
    if (text != '') {
      const response = await fetch(getUrl, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();
      options.push(data);
    }
  } catch (error) {
    alert(error.message);
  }
  document.getElementById('itemText').value = '';
  render(template(options), root);
}
render(template(options), root);
