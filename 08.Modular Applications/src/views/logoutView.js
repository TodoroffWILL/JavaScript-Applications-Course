import * as authService from '../services/authService.js';

export const logoutView = (ctx) => {
  authService.logout().then((res) => {
    ctx.page.redirect('/');
  });
};
