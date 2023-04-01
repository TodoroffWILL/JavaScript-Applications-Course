import { del } from '../api.js';
import page from '/node_modules/page/page.mjs';

export function onClick(e) {
  const confirmDeleteting = confirm(
    'Are you sure you want to delete this furniture?'
  );
  if (confirmDeleteting) {
    del(`/data/catalog/${e.target.id}`);
    page.redirect('/');
  }
}
