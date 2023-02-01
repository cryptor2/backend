const { urlencoded } = require("express");
const express = require("express");
const app = express();
const PORT = 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(8000, () => console.log("listening at.....", PORT));
