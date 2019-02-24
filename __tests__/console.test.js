// eslint is looking for `puppeteer` at root level package.json
// eslint-disable-next-line import/no-unresolved
const puppeteer = require('puppeteer');

const HOME_PAGE = 'http://127.0.0.1:5500/';
const CATALOG_PAGE = 'http://127.0.0.1:5500/catalog.html';

describe('check that pages doesn\'t have console errors', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('has no console errors on home page', async (done) => {
    const page = await browser.newPage();

    page.on('pageerror', (error) => {
      expect(error).toBe(null);
      done();
    });

    page.on('error', (error) => {
      expect(error).toBe(null);
      done();
    });

    page.on('requestfailed', (interceptedRequest) => {
      expect(`Failed to load: ${interceptedRequest.url()}`).toBe(null);
      done();
    });

    await page.goto(HOME_PAGE);

    setTimeout(done, 1000);
  });

  it('has no console errors on catalog page', async (done) => {
    const page = await browser.newPage();

    page.on('pageerror', (error) => {
      expect(error).toBe(null);
      done();
    });

    page.on('error', (error) => {
      expect(error).toBe(null);
      done();
    });

    page.on('requestfailed', (interceptedRequest) => {
      expect(`Failed to load: ${interceptedRequest.url()}`).toBe(null);
      done();
    });

    await page.goto(CATALOG_PAGE);

    setTimeout(done, 1000);
  });

  afterAll(async () => {
    await browser.close();
  });
});
