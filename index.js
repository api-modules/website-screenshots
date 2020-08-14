const puppeteer = require('puppeteer');

const args = process.argv.slice(2);

if (!args.length) {
  throw new Error('Missing url to fetch');
}

const options = {
  width: 1280,
  height: 720,
};

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        `--window-size=${options.width},${options.height}`
      ]
    });

    const page = (await browser.pages())[0];

    // This is well explained in the API
    await page.setViewport({ ...options });

    await page.goto(args[0]);
    const image = await page.screenshot({
      type: 'png',
      encoding: 'base64'
    });

    console.log(image);

    await browser.close();
  } catch (e) {
    process.exit(-1);
  }
})();
