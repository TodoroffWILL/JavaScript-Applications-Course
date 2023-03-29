const contactsURL = 'http://localhost:3030/jsonstore/contacts';

export const getContacts = () => {
  return fetch(contactsURL)
    .then((res) => res.json())
    .then((result) => Object.values(result));
};
