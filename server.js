const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
};

app.route("/ping").get((req, res, next) => {
  try {
    res.send("pong");
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
});

module.exports = app;
