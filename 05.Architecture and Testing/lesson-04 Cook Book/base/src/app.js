import { router } from './router.js';
import { updateAuth } from './auth.js';

updateAuth();
router('/');

const navElement = document.querySelector('.navigation');
navElement.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName == 'A') {
    let url = new URL(e.target.href); // URL object giving detailed info of the url !

    document.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    router(url.pathname);
  }
});
