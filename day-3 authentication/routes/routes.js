const express = require("express");
const { validateHeaderName } = require("http");
const router = express.Router();
const bcrypt = require("bcrypt");
const createDB = require("../config/db");
const User = require("../models/userModels");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validate");

createDB.sync().then(() => {
  console.log("db is re]unning");
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const userExist = await User.findOne({
      where: { email },
    });

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const saveToDB = {
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(saveToDB);

    res.status(201).send(createdUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({
      where: { email },
    });
    if (!userExist) {
      res.send("User not exist");
    }
    const passMatch = await bcrypt.compare(
      password,
      userExist.dataValues.password
    );
    if (!passMatch) {
      res.send("incorrect password");
    }
    res.send("successfully login ");
  } catch (e) {}
});
module.exports = router;
