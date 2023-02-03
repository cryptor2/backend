const express = require("express");
const { transporter, options } = require("./services/email");
const app = express();
const PORT = 1338;
const schedular = require("node-cron");

schedular.schedule("* * * * * *", () => {
  console.log("sending email. . . . . . ");
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.error(err);
    }
    console.log("email send with info: ", info);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
