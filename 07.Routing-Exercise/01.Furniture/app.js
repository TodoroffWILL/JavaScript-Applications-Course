import page from '/node_modules/page/page.mjs';

import { catalogView } from './views/catalogView.js';
import { registerView } from './views/registerView.js';
import { logoutView } from './views/logoutView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { createView } from './views/createView.js';
import { myFurnitureView } from './views/myFurnitureView.js';
import { loginView } from './views/loginView.js';

export function updateNav() {
  const userNav = document.getElementById('user');
  const guestNav = document.getElementById('guest');
  if (sessionStorage.getItem('userData')) {
    userNav.style.display = 'inline-block';
    guestNav.style.display = 'none';
  } else {
    userNav.style.display = 'none';
    guestNav.style.display = 'inline-block';
  }
}
// Start of the application
updateNav();
document.getElementById('logoutBtn').addEventListener('click', logoutView);

page('/', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/create', createView);
page('/my-publications', myFurnitureView);

page.start();
