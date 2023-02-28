function loadRepos() {
  const result = document.getElementById('res');

  let url = 'https://api.github.com/users/testnakov/repos';
  const httpRequest = new XMLHttpRequest();
  httpRequest.addEventListener('readystatechange', () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText;
      result.textContent = JSON.parse(data)
        .map((x) => x.name)
        .join(', ');
    }
  });
  httpRequest.open('GET', url);
  httpRequest.send();
}
