const puppeteer = require('puppeteer');

const TIME_OUT = 7000;
const URL = 'https://mateodev.cloud';

//asynchronous IIFE (Inmediately Invoked Function Expression)
async function getViews() {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

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
}

//INTEGRATION TEST
test("The views count difference between two consecutive requests must be 1", async () => {
    const first_req = await getViews();
    console.log('First request result:'+ first_req);

    const second_req = await getViews();
    console.log('Second request result:'+ second_req);

    expect(second_req - first_req).toEqual(1);
},TIME_OUT);
