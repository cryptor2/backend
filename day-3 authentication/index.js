const express = require("express");
const routes = require("./routes/routes.js");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
 
const app = express();
app.use(cors(corsOptions));
//accept json
app.use(express.json());

app.use(express.static("public"));
app.use("/api/v1", routes);
// accept body
app.use(express.urlencoded({ extended: true }));
const PORT = 8000;

app.listen(PORT, () => {
  console.log("listning");
});
