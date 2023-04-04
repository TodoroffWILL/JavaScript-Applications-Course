import page from '/node_modules/page/page.mjs';
import { decorateContext } from './middlewares/render.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { addSession } from './middlewares/session.js';
import { updateNav } from './middlewares/navBar.js';
import { preload } from './middlewares/preload.js';
import { logout } from './api/user.js';

document.getElementById('logoutBtn').addEventListener('click', () => {
  logout();
  page.redirect('/');
});

page(addSession);
page(updateNav);
page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/details/:id', preload, detailsPage);
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/edit/:id', editPage);

page.start();
