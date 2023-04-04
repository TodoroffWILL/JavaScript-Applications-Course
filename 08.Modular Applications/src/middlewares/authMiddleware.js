import * as authService from '../services/authService.js';

export const authMiddleware = (ctx, next) => {
  ctx.isAuthenticated = authService.isAuthenticated();
  ctx.user = authService.getUser();
  next();
};
