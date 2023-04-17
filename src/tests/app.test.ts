import puppeteer from "puppeteer";

test('adds_numbers', () => {
    const sum = 10 + 20;

    expect(sum).toEqual(30);
});

test('launch_browser', async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    expect(page).toBeDefined();
    await browser.close()
});

