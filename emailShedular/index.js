const express = require("express");
const app = express();
const PORT = 1338;
const schedular = require("node-cron");

schedular.schedule("* * * * * *", () => {
  console.log("inside schedular");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
