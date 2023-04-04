const userLinks = document.getElementById('user');
const guestLinks = document.getElementById('guest');

const links = {
  '/catalog': document.getElementById('catalogLink'),
  '/create': document.getElementById('createLink'),
  '/login': document.getElementById('loginLink'),
  '/register': document.getElementById('registerLink'),
};

export function updateNav(ctx, next) {
  Object.values(links).forEach((x) => x.classList.remove('active'));
  const current = links[ctx.pathname];
  if (current) {
    current.classList.add('active');
  }

  if (ctx.user) {
    userLinks.style.display = 'inline-block';
    guestLinks.style.display = 'none';
  } else {
    guestLinks.style.display = 'inline-block';
    userLinks.style.display = 'none';
  }

  next();
}
