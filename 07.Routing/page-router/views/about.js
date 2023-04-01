import { html, render } from '../node_modules/lit-html/lit-html.js';



const aboutTemplate = () => html`
<h1>About</h1>
<p>About me asoidfqhwgh'qg</p>`;
const root = document.getElementById('root');

const aboutView = (ctx) => {
  render(aboutTemplate(),root)
};

export { aboutView };
