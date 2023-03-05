const url = 'http://localhost:3030/jsonstore/phonebook';
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

function attachEvents() {
  document.getElementById('btnLoad').addEventListener('click', loadAllphones);
  document
    .getElementById('btnCreate')
    .addEventListener('click', createNewPhone);
}

async function loadAllphones() {
  document.getElementById('phonebook').innerHTML = '';
  try {
    const data = await (await fetch(url)).json();
    Object.values(data).forEach((el) => {
      let li = document.createElement('li');
      li.textContent = `${el.person}: ${el.phone}`;
      let button = document.createElement('button');
      button.textContent = 'Delete';
      li.appendChild(button);
      document.getElementById('phonebook').appendChild(li);
      button.addEventListener('click', async (e) => {
        await fetch(`${url}/${el._id}`, {
          method: 'DELETE',
        });
        e.target.parentNode.remove();
      });
    });
  } catch (err) {
    console.log(err);
  }
}
async function createNewPhone() {
  let data = {
    person: personInput.value,
    phone: phoneInput.value,
  };
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  loadAllphones();
  personInput.value = '';
  phoneInput.value = '';
}

attachEvents();
