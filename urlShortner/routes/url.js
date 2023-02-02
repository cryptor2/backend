const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const createDB = require("../config/db");
const Url = require("../models/urlModels");
const baseUrl = "http://localhost:8000/urlapi";
createDB.sync().then(() => {
  console.log("db is running");
});

router.get("/:short", async (req, res) => {
  let shortId = req.params.short;
  console.log("shortID", shortId);
  try {
    //get longyrl
    let url = await Url.findOne({
      where: {
        shortUrl: shortId,
      },
    });
    if (!url) {
      return res.status(404).send("invalid short url");
    }
    return res.redirect(url.longUrl);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortId = nanoid(4);

    const shortUrl = await Url.create({
      longUrl,
      shortUrl: shortId,
    });
    return res.status(200).json({
      status: "ok",
      shortUrl: `${baseUrl}/${shortId}`,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
