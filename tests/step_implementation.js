/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, screenshot, text, focus, textBox, toRightOf } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto getgauge github page", async () => {
    await goto('https://github.com/getgauge');
});

step("Search for <query>", async (query) => {
    try {
        await focus(textBox(toRightOf('Pricingasd'))) //changed to simulate an error.
        await write(query);
        await press('Enter');            
    } catch (e) {
        console.error(e);
    }
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(content).exists());
});
