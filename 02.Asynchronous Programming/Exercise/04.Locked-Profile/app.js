async function lockedProfile() {
  const mainDiv = document.getElementById('main');

  const url = 'http://localhost:3030/jsonstore/advanced/profiles';
  const res = await fetch(url);
  if (!res.ok) throw new Error();
  const data = await res.json();

  Object.entries(data).forEach((el, i) => {
    const divProfile = document.createElement('div');
    divProfile.className = 'profile';

    let img = document.createElement('img');
    img.src = './iconProfile2.png';
    img.className = 'userIcon';
    divProfile.appendChild(img);

    let labelLock = document.createElement('label');
    labelLock.textContent = 'Lock ';
    divProfile.appendChild(labelLock);

    let inputLock = document.createElement('input');
    inputLock.type = 'radio';
    inputLock.value = 'lock';
    inputLock.checked = true;
    inputLock.setAttribute('name', `${el[1].username}`);
    divProfile.appendChild(inputLock);

    let labelUnlock = document.createElement('label');
    labelUnlock.textContent = ' Unlock ';
    divProfile.appendChild(labelUnlock);

    let inputUnlock = document.createElement('input');
    inputUnlock.type = 'radio';
    inputUnlock.value = 'unlock';
    inputUnlock.setAttribute('name', `${el[1].username}`);
    let br = document.createElement('br');
    let hr = document.createElement('hr');
    divProfile.appendChild(inputUnlock);
    divProfile.appendChild(br);
    divProfile.appendChild(hr);

    let userLabel = document.createElement('label');
    userLabel.textContent = 'Username ';
    divProfile.appendChild(userLabel);

    let userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.setAttribute('name', `${el[1].username}`);
    userInput.value = `${el[1].username}`;
    userInput.disabled = 'readonly';
    divProfile.appendChild(userInput);

    let divHiddenFields = document.createElement('div');
    divHiddenFields.id = `${el[0]}`;
    let hr2 = document.createElement('hr');
    divHiddenFields.appendChild(hr2);
    divProfile.appendChild(divHiddenFields);

    let emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email: ';
    divHiddenFields.appendChild(emailLabel);

    let emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.setAttribute('name', `${el[1].email}`);
    emailInput.value = el[1].email;
    emailInput.disabled = 'readonly';
    divHiddenFields.appendChild(emailInput);
    divHiddenFields.appendChild(br);
    let ageLabel = document.createElement('label');
    ageLabel.textContent = 'Age: ';
    divHiddenFields.appendChild(ageLabel);

    let ageInput = document.createElement('input');
    ageInput.type = 'email';
    ageInput.setAttribute('name', `${el[1].age}`);
    ageInput.value = el[1].age;
    ageInput.disabled = 'readonly';
    divHiddenFields.appendChild(ageInput);

    let button = document.createElement('button');
    button.textContent = 'Show More';
    divProfile.appendChild(button);
    divHiddenFields.style.display = 'none';
    mainDiv.appendChild(divProfile);

    button.addEventListener('click', (e) => {
      let profile = e.target.parentNode;
      let lockStatus = profile.querySelector('input[type="radio"]:checked');
      let moreInfo = profile.querySelectorAll('div')[0];

      if (lockStatus.value === 'unlock') {
        if (e.target.textContent == 'Show More') {
          moreInfo.style.display = 'inline-block';
          e.target.textContent = 'Hide It';
        } else if (e.target.textContent == 'Hide It') {
          moreInfo.style.display = 'none';
          e.target.textContent = 'Show More';
        }
      }
    });
  });
}
