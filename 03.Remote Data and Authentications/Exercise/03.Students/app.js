const submitBTN = document.getElementById('submit');
const url = 'http://localhost:3030/jsonstore/collections/students';

let gradeInput = document.querySelector('input[name="grade"]');
let firstNameInput = document.querySelector('input[name="firstName"]');
let lastNameInput = document.querySelector('input[name="lastName"]');
let facilityNumInput = document.querySelector('input[name="facultyNumber"]');
const tBody = document.querySelector('#results tbody');
window.addEventListener('load', viewStudents);
submitBTN.addEventListener('click', createStudent);
async function createStudent(e) {
  e.preventDefault();
  if (
    firstNameInput.value !== '' &&
    lastNameInput.value !== '' &&
    facilityNumInput.value !== '' &&
    gradeInput.value !== ''
  ) {
    let form = document.getElementById('form');
    let data = new FormData(form);
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    } catch (error) {
      alert(error);
    }

    firstNameInput.value = '';
    lastNameInput.value = '';
    facilityNumInput.value = '';
    gradeInput.value = '';
  }
  viewStudents();
}
async function viewStudents() {
  try {
    let data = await (await fetch(url)).json();
    tBody.innerHTML = '';
    Object.values(data).forEach((x) => {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.textContent = `${x.firstName}`;
      tr.appendChild(td1);
      let td2 = document.createElement('td');
      td2.textContent = `${x.lastName}`;
      tr.appendChild(td2);
      let td3 = document.createElement('td');
      td3.textContent = `${x.facultyNumber}`;
      tr.appendChild(td3);
      let td4 = document.createElement('td');
      td4.textContent = `${x.grade}`;
      tr.appendChild(td4);
      tBody.appendChild(tr);
    });
  } catch (error) {
    alert(error);
  }
}
