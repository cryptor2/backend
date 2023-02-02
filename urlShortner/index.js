const { urlencoded } = require("express");
const express = require("express");
const shortUrl = require("./routes/url");
const homeRoutes = require("./routes/home");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
const PORT = 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/urlapi", shortUrl);
app.use("/", homeRoutes);
app.listen(8000, () => console.log("listening at.....", PORT));
