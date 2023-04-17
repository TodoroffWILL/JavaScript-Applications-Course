import page from '/node_modules/page/page.mjs';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { catalogView } from './views/catalog.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { searchView } from './views/search.js';
import { logout } from './api/user.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/logout', onLogout);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/details/:id', detailsView);
page('/create', createView);
page('/edit/:id', editView);
page('/search', searchView);

page.start();

function onLogout() {
  logout();
  page.redirect('/');
}
