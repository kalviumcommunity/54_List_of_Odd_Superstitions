const express = require("express");
const app = express();
const port = 3000;

app.route("/ping").get((req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
});

module.exports = app