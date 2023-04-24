import puppeteer, {Browser, Page} from "puppeteer";

let browser: Browser;
let page: Page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
});

beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
});

test('test_searchbar', async () => {
    const value = await page.$eval('label#searchbar', el => el.innerText);
    expect(value.trim()).toEqual('search...');

});

afterAll(async () => {
    await browser.close()
});

