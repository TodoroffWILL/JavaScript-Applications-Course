const homeTemplate = () => `
<h1>Home</h1>
<p>Lorem Ipsum</p>`;

const articlesTemplate = () => `
<h1>Articles</h1>
<p>Blabbalblalblalba</p><p>Blabbalblalblalba</p><p>Blabbalblalblalba</p>`;

const aboutTemplate = () => `
<h1>About</h1>
<p>About me asoidfqhwgh'qg</p>`;

const routes = {
  '#home': homeTemplate,
  '#articles': articlesTemplate,
  '#about': aboutTemplate,
};

const root = document.getElementById('root');

window.addEventListener('hashchange', (e) => {
  let template = routes[location.hash];

  root.innerHTML = template();
});
