import * as faker from "faker";
import * as puppeteer from "puppeteer";
import * as express from "express";

import { GameBookApp } from '../src/server/app';
// const {config} = require('../../dist/ServerConfig');

describe("Main page is login", () => {
    const serverEx = express();
    let browser : puppeteer.Browser = undefined;
    let server : GameBookApp = undefined;

    beforeEach(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox',
        '--headless',
        '--disable-gpu',
        '--window-size=1920x1080'], headless: true });
        server = new GameBookApp(serverEx);
    });

    afterEach(async () => {
        // if (browser) {
        //     await browser.close();
        // }

        // if (server) {
        //     await server.stop();
        // }
    });

    it("should redirect to login without token", async () => {

        const port = await server.init(5000);
        const page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400
            },
            userAgent: ''
        });

        // console.log(1, "@@@");
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
        await page.goto('http://localhost:5000', {waitUntil: 'load'}).catch((e) => {
            console.log(e);
        });
        // console.log(2, "@@@");

        // console.log(await page.evaluate(() => document.body.innerHTML));
        
        // await page.waitForNavigation();
        await page.waitForSelector('.auth-form__content__header');
        // console.log(3, "@@@");
        
        const html = await page.$eval('.auth-form__content__header', e => e.innerHTML);
        expect(html).toBe('Sign In');

        // browser.close();
    }, 10000);
})