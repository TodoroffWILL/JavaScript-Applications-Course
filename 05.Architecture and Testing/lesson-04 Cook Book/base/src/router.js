import { notFound404 } from './404.js';
import { create } from './create.js';
import { renderHome } from './home.js';
import { loginRendering } from './login.js';
import { renderLogout } from './logout.js';
import { register } from './register.js';

const routes = {
  '/': renderHome,
  '/login': loginRendering,
  '/register': register,
  '/create': create,
  '/logout': renderLogout,
};

export function router(path) {
  //TODO: Hide all section page
  hideContent();
  const renderer = routes[path] || notFound404;
  renderer();
}

function hideContent() {
  const mainContent = document.querySelector('.main-content');
  for (const section of mainContent.children) {
    section.style.display = 'none'; // HIDING ALL SECTIONS !
  }
}
