import * as faker from "faker";
import * as puppeteer from "puppeteer";

describe("Main page is login", () => {
    it("should redirect to login without token", async () => {
        let browser = await puppeteer.launch({
            headless: true
        });
        let page = await browser.newPage();
        page.emulate({
            viewport: {
                width: 500,
                height: 2400
            },
            userAgent: ''
        });

        await page.goto('http://localhost:1234/');
        await page.waitForSelector('.auth-form__content__header');
        const html = await page.$eval('.auth-form__content__header', e => e.innerHTML);
        expect(html).toBe('Sign In');

        browser.close();
    }, 16000);
})