const homeTemplate = () => `
<h1>Home</h1>
<p>Lorem Ipsum</p>`;

const articlesTemplate = () => `
<h1>Articles</h1>
<p>Blabbalblalblalba</p><p>Blabbalblalblalba</p><p>Blabbalblalblalba</p>`;

const aboutTemplate = () => `
<h1>About</h1>
<p>About me asoidfqhwgh'qg</p>`;
const notFoundTemplate = () => `<h1>Page Not Found</h1>`;

const routes = {
  '/home': homeTemplate,
  '/articles': articlesTemplate,
  '/about': aboutTemplate,
};

const root = document.getElementById('root');

const navigate = (pathname, pushState = true) => {
  if (pushState) {
    history.pushState({}, '', pathname);
  }
  let template = routes[pathname];

  if (!template) {
    template = notFoundTemplate;
  }

  root.innerHTML = template();
};

document.body.addEventListener('click', (e) => {
  if (e.target.tagName == 'A') {
    e.preventDefault();
    let url = new URL(e.target.href);
    navigate(url.pathname);
  }
});

window.addEventListener('popstate', (e) => {
  navigate(location.pathname, false);
});

navigate(location.pathname, false);
