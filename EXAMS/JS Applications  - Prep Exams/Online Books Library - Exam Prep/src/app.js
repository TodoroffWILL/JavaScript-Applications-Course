import page from '/node_modules/page/page.mjs';
import { addSession } from './middlewares/session.js';
import { addRender } from './middlewares/render.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './api/user.js';
import { homeView } from './views/home.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { myBooksView } from './views/mybooks.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/mybooks', myBooksView);

page.start();

function onLogout(ctx) {
  logout();
  ctx.page.redirect('/');
}
