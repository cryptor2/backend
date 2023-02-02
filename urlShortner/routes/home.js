const express = require("express");
const { dirname } = require("path");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  console.log("dirname", __dirname);

  const htmlPath = path.join(__dirname, "public", "index.html");
  res.sendFile(htmlPath);
});

module.exports = router;
