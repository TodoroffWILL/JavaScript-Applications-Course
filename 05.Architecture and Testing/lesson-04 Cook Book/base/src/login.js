import { loginFetch } from './api.js';
import { updateAuth, saveUser } from './auth.js';

const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);
  let email = formData.get('email');
  let password = formData.get('password');

  loginFetch(email, password)
    .then((user) => {
      saveUser(user);
      updateAuth();
      alert('Succesfully logged in.');
    })
    .catch((err) => console.log(err));
});

export function loginRendering() {
  loginSection.style.display = 'block';
}
