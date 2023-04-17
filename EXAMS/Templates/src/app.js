import page from '/node_modules/page/page.mjs';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { logout } from './api/user.js';

page(addSession);
page(addRender);

page('/logout', onLogout);

page.start();

function onLogout() {
  logout();
  page.redirect('/');
}
