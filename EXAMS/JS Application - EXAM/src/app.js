import page from '/node_modules/page/page.mjs';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './api/user.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();

function onLogout() {
  logout();
  page.redirect('/');
}
