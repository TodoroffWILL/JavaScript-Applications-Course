import { showDetails } from './details.js';

const section = document.getElementById('homeView');
section.querySelector('div.topic-title').addEventListener('click', showDetails);
section.remove();

const cancelBTN = section.querySelector('[name="cancel"]');
cancelBTN.addEventListener('click', clearForm);

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

const postContainer = section.querySelector('.topic-container');
export async function showHome(e) {
  e && e.preventDefault();
  document.getElementById('main').replaceChildren('Loading...');

  const res = await fetch(
    'http://localhost:3030/jsonstore/collections/myboard/posts'
  );
  const posts = await res.json();
  document.getElementById('main').replaceChildren(section);
  postContainer.replaceChildren(...Object.values(posts).map(createPostPreview));
}

function createPostPreview(post) {
  const element = document.createElement('div');
  element.className = 'topic-name-wrapper';

  element.innerHTML = `<div class="topic-name">
<a href="#" class="normal" id = "${post._id}">
  <h2>${post.topicName}</h2>
</a>
<div class="columns">
  <div>
    <p>Date: <time>${post.dateCreated}</time></p>
    <div class="nick-name">
      <p>Username: <span>${post.username}</span></p>
    </div>
  </div>
</div>
</div>`;

  return element;
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { topicName, username, postText } = Object.fromEntries(formData);
  if (username == '' || postText == '' || topicName == '') {
    throw new Error('All fields are required!');
  }
  try {
    const res = await fetch(
      'http://localhost:3030/jsonstore/collections/myboard/posts',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          topicName,
          username,
          postText,
          dateCreated: new Date(),
        }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    form.reset();
    showHome();
  } catch (err) {
    alert(err.message);
  }
}

function clearForm() {
  form.reset();
}

window.showDetails = showDetails;
