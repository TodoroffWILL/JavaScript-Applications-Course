const url = 'http://localhost:3030/jsonstore/messenger';
const textArea = document.getElementById('messages');

function attachEvents() {
  document.getElementById('submit').addEventListener('click', postMSGes);
  document.getElementById('refresh').addEventListener('click', loadMSGes);
}

async function loadMSGes() {
  const res = await fetch(url);
  const data = await res.json();
  textArea.value = Object.values(data)
    .map(({ author, content }) => `${author}: ${content}`)
    .join('\n');
}

async function postMSGes() {
  const author = document.querySelector('input[name="author"]');
  const content = document.querySelector('input[name="content"]');
  if (author.value === '' || content.value === '') {
    alert('Please fill the input fields.');
  }
  await request(url, { author: author.value, content: content.value });
  author.value = '';
  content.value = '';
}

async function request(url, option) {
  if (option) {
    option = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(option),
    };
  }
  const response = await fetch(url, option);
  return response.json();
}

attachEvents();
