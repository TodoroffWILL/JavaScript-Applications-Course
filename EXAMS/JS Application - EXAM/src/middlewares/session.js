import { getUserData } from '../util.js'; // Attaching the user to the ctx

export function addSession(ctx, next) {
  ctx.user = getUserData();

  next();
}
