const { firefox } = require('playwright-firefox');
const { expect } = require('chai');

const hostUrl =
  'http://localhost:5500/05.Architecture%20and%20Testing/Exercise/02.Book-Library/index.html';
const options = { headless: false, slowMo: 200 };

const mochData = {
  'd953e5fb-a585-4d6b-92d3-ee90697398a0': {
    author: 'J.K.Rowling',
    title: "Harry Potter and the Philosopher's Stone",
  },
  'd953e5fb-a585-4d6b-92d3-ee90697398a1': {
    author: 'Svetlin Nakov',
    title: 'C# Fundamentals',
  },
};

describe('Tests', async function () {
  this.timeout(6000);
  let browser, page;

  before(async () => {
    browser = await firefox.launch(options); // Before all the tests
  });
  after(async () => {
    await browser.close(); // After all the tests
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    page.close();
  });

  it('Should load all books', async () => {
    await page.route('**/jsonstore/collections/books', (route, request) => {
      route.fulfill({
        body: JSON.stringify(mochData),
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        },
      });
      console.log('Intercepted request');
    });
    await page.goto(hostUrl);
    await page.click('text=Load all books');
    // await page.screenshot({ path: 'screen.png' });
    await page.waitForSelector('text=Harry Potter');
    const rowData = await page.$$eval('tbody tr', (rows) =>
      rows.map((r) => r.textContent)
    );

    expect(rowData[0]).to.contains('Harry Potter');
    expect(rowData[0]).to.contains('Rowling');

    expect(rowData[1]).to.contains('C# Fundamentals');
    expect(rowData[1]).to.contains('Nakov');
  });

  it('Should add a book', async () => {
    //navigate to page
    //find forms
    // fill input fields
    await page.goto(hostUrl);
    await page.fill('input[name="title"]', 'Help me God');
    await page.fill('input[name="author"]', 'Doncho');

    const [request] = await Promise.all([
      page.waitForRequest((request) => request.method() == 'POST'),
      page.click('text = Submit'),
    ]);
    const data = JSON.parse(request.postData());
    expect(data.title).to.equal('Help me God');
    expect(data.author).to.equal('Doncho');
  });

  
});
