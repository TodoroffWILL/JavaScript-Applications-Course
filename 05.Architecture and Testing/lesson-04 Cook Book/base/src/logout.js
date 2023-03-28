import { logout,updateAuth } from './auth.js';

export function renderLogout() {
  logout();
  alert('Successful logout');
}
