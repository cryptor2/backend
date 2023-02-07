const puppeteer = require("puppeteer");
const fs = require("fs");
const data = {
  list: [],
};
async function main(skill) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // https://in.indeed.com/jobs?q={skill}&l=Chandigarh
  await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=pune`, {
    timeout: 0,
    waitUntil: "networkidle0",
  });

  const jobData = await page.evaluate(async (data) => {
    const items = document.querySelectorAll("td.resultContent");
    items.forEach((item, index) => {
      const title = item.querySelector("h2.jobTitle>a")?.innerText;
      const link = item.querySelector("h2.jobTitle>a")?.href;
      let salary = item.querySelector(
        "div.metadata.salary-snippt-container >div"
      )?.innerText;
      const companyName = item.querySelector("span.companyName")?.innerText;

      if (salary === null) {
        salary = "not defined";
      }
      data.list.push({
        title,
        salary,
        companyName,
        link,
      });
    });
    return data;
  }, data);
  let response = await jobData;
  let json = JSON.stringify(jobData, null, 2);

  fs.writeFile("job.json", json, "utf-8", () => {
    console.log("written in job.json");
  });
  browser.close();
  return response;
}
module.exports = main;
