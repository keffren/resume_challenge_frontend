const puppeteer = require('puppeteer');

const TIME_OUT = 7000;
const URL = 'https://mateodev.cloud';

//asynchronous IIFE (Inmediately Invoked Function Expression)
async function getViews() {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
  
    //Navigate to the web
    await page.goto(URL, { waitUntil: 'networkidle2' });
  
    // Wait for the element with the specific selector to appear in the DOM
    await page.waitForSelector('#views-counter');
  
    // Extract the content after it's loaded
    const counterValue = await page.$eval('#views-counter', element => element.textContent);
    //console.log('Counter Value:', counterValue);
  
    await browser.close();
    
    return counterValue;
};

//INTEGRATION TEST
test("The views count difference between two consecutive requests must be 1", async() => {
    const first_req = await getViews();
    const second_req = await getViews();

    expect(second_req - first_req).toBe(1);
},TIME_OUT);