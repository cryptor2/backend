const puppeteer = require("puppeteer");
const data = {
  list: [],
};
async function main(skill) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // https://in.indeed.com/jobs?q={skill}&l=Chandigarh
  page.goto(`https://in.indeed.com/jobs?q=${skill}&l=Chandigarh`, {
    timeout: 0,
    waitUntil: "networkidle0",
  });
  browser.close();
}
moldule.exports = main;
