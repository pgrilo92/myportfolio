const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const screenshots = [
  { url: 'http://localhost:3000/pt/', name: 'portuguese-desktop', viewport: { width: 1920, height: 1080 } },
  { url: 'http://localhost:3000/pt/', name: 'portuguese-mobile', viewport: { width: 375, height: 812 } },
  { url: 'http://localhost:3000/fr/', name: 'french-desktop', viewport: { width: 1920, height: 1080 } },
  { url: 'http://localhost:3000/fr/', name: 'french-mobile', viewport: { width: 375, height: 812 } },
  { url: 'http://localhost:3000/en/', name: 'english-desktop', viewport: { width: 1920, height: 1080 } },
  { url: 'http://localhost:3000/en/', name: 'english-mobile', viewport: { width: 375, height: 812 } },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/local/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  for (const shot of screenshots) {
    console.log(`Taking screenshot: ${shot.name}`);
    const page = await browser.newPage();
    await page.setViewport(shot.viewport);
    await page.goto(shot.url, { waitUntil: 'networkidle0' });
    
    await page.screenshot({
      path: path.join(screenshotDir, `${shot.name}.png`),
      fullPage: true,
    });
    
    await page.close();
    console.log(`Saved: ${shot.name}.png`);
  }
  
  await browser.close();
  console.log('All screenshots taken!');
})();
