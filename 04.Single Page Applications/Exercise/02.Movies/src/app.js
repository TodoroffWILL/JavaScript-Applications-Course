// [x] Improve HTML structure
// [x] Create app.js module
// [x] Create util.js containing hide and display of view
// [x] Placeholders for all views

// [x]implement views
// []create request logic
// []DOM manipulation logic

// [x] catalog
// [x] login
// [ ] register
// [ ] create
// [ ]details
// [ ] like
// [ ]edit
// [ ]delete

import { createSection } from './create.js';
import { homePage } from './home.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { updateNav } from './util.js';

const routes = {
  '/': homePage,
  '/login': loginPage,
  '/logout': logout,
  '/register': registerPage,
  '/create': createSection,
};

document.querySelector('nav').addEventListener('click', onNavigate);
document
  .querySelector('#add-movie-button a')
  .addEventListener('click', onNavigate);

function onNavigate(e) {
  if (e.target.tagName == 'A' && e.target.href) {
    e.preventDefault();
    const url = new URL(e.target.href);

    const view = routes[url.pathname];
    if (typeof view == 'function') {
      view();
    }
  }
}

function logout() {
  localStorage.removeItem('user');
  updateNav();
}
updateNav();
homePage();
