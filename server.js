const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Zoetic api" });
});

require("./routes/device.routes.js")(app);

app.listen(6000, () => {
  console.log("Server is running on port 6000.");
});