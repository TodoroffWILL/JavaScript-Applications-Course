const url = 'http://localhost:3030/jsonstore/collections/books';
const loadBTN = document.getElementById('loadBooks');
const submitBTN = document.querySelector('form button');
// const deleteBTN = document.querySelector();
const tBody = document.querySelector('table tbody');
window.addEventListener('load', () => {
  tBody.innerHTML = '';
});

loadBTN.addEventListener('click', loadAllBooks);
submitBTN.addEventListener('click', createNewBook);

async function loadAllBooks(e) {
  const data = await (await fetch(url)).json();
  tBody.innerHTML = '';

  Object.values(data).map((x) => {
    let tr = document.createElement('tr');

    let tdTitle = document.createElement('td');
    tdTitle.textContent = x.title;
    tr.appendChild(tdTitle);

    let tdAuthor = document.createElement('td');
    tdAuthor.textContent = x.author;
    tr.appendChild(tdAuthor);

    let tdButtons = document.createElement('td');
    tr.appendChild(tdButtons);

    let editBTN = document.createElement('button');
    editBTN.textContent = 'Edit';
    editBTN.classList.add('edit');
    tdButtons.appendChild(editBTN);

    let deleteBTN = document.createElement('button');
    deleteBTN.classList.add('delete');
    deleteBTN.textContent = 'Delete';
    tdButtons.appendChild(deleteBTN);

    tBody.appendChild(tr);
  });
}
async function createNewBook(e) {
  e.preventDefault();
  let form = document.querySelector('form');
  let data = Object.fromEntries(new FormData(form));
  if (data.title == '' || data.author == '') {
    return;
  }
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  form.reset();
}
