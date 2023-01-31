const express = require("express");
const { validateHeaderName } = require("http");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validate");

let users = {};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const userExist = users.hasOwnProperty(email);
    if (userExist) {
      res.send("user exists");
    }
    if (!validateName(name)) {
      res.send("Name is not valid");
    }
    if (!validateEmail(email)) {
      res.send("Inavlid email");
    }
    if (!validatePassword(password)) {
      res.send("InvalidPassword");
    }
    const Epassword = await bcrypt.hash(password, 10);
    users[email] = { name, Epassword };
    res.send("Success");
  } catch (e) {}
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!users.hasOwnProperty(email)) {
      res.send("User not exist");
    }
    const passMatch = await bcrypt.compare(password, users[email]);
    if (!passMatch) {
      res.send("incorrect password");
    }
    res.send("successfully login ");
  } catch (e) {}
});
module.exports = router;
