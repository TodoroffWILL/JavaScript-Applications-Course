const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const options = { headless: false, slowMo: 200 };
const ourAppUrl =
  'http://127.0.0.1:5500/05.Architecture%20and%20Testing/lesson-04%20Cook%20Book/base/index.html';

describe('Custom Tests', function () {
  this.timeout(10000);
  it('Succesfull Login', async function () {
    const browser = await chromium.launch(options);
    const page = await browser.newPage();

    await page.goto(ourAppUrl); // Going to the url of the page
    await page.click('text="Login"'); // Exact match of the selector. It must contain 'Login' in the page !

    await page.fill('input[name=email]', 'peter@abv.bg');
    await page.fill('input[name=password]', '123456');

    await page.click('input[value=Login]');

    await page.click('text=Catalog'); // Partial Match of the selector
    // await page.screenshot({ path: 'screen.png' }); // MAKING SCREENSHOT OF THE PAGE
    // await browser.close(); // CLOSES THE BROWSER after doing all the tests!
    let buttonText = await page.textContent('a[href="/logout"]'); // Getting the text content of this element !

    expect(buttonText).to.equal('Logout');
  });
});
