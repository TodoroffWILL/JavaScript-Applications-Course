const itemName = 'userData';
//Важно - тук е localStorage
export function getUserData() {
  return JSON.parse(localStorage.getItem(itemName));
}
export function setUserData(data) {
  return localStorage.setItem(itemName, JSON.stringify(data));
}
// Clearing the user data when logouting
export function clearUserData() {
  localStorage.removeItem(itemName);
}

// Taking only the accessToken of the user if it has it
export function getAccessToken() {
  const user = getUserData();
  if (user) {
    return user.accessToken;
  } else {
    return;
  }
}

export function createSubmitHandler(ctx, handler) {
  return function (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    handler(ctx, formData, e);
  };
}

export function alertFnMessage(message) {
  return alert(message);
}
