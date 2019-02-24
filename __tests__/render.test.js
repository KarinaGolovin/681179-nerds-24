// eslint is looking for `puppeteer` at root level package.json
// eslint-disable-next-line import/no-unresolved
const puppeteer = require('puppeteer');
const pageWaitTimeout = 1200;

const HOME_PAGE = 'http://127.0.0.1:5500/';
const CATALOG_PAGE = 'http://127.0.0.1:5500/catalog.html';

describe('check that pages renders correctly', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('renders home page correctly', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 2500 });
    await page.goto(HOME_PAGE);
    await page.waitFor(pageWaitTimeout);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it('renders catalog page correctly', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 2500 });
    await page.goto(CATALOG_PAGE);
    await page.waitFor(pageWaitTimeout);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
