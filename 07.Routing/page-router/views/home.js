import { html, render } from '../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html` <h1>Home</h1>
  <p>Lorem Ipsum</p>`;

const root = document.getElementById('root');

const homeView = (ctx) => {
  render(homeTemplate(), root);
};

export { homeView };
