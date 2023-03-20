import { homePage } from './home.js';
import { showView } from './util.js';
import { updateNav } from './util.js';

const section = document.querySelector('#form-login');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

export function loginPage() {
  showView(section);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { email, password } = Object.fromEntries(formData);

  await login(email, password);
  form.reset();
  updateNav();
  homePage();
}

async function login(email, password) {
  try {
    const res = await fetch('http://localhost:3030/users/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const user = await res.json();
    localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

window.login = login;
