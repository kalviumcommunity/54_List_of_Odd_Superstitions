const express = require("express");
const env = require("dotenv").config();
const { connectToMongoDB } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
};

let db;

const startServer = async () => {
  try {
    db = await connectToMongoDB();

    app.get("/", (req, res) => {
      const isConnected = db ? true : false;
      res.send(
        `Database connection Status: ${
          isConnected ? "Database is connected" : "Database is not connected"
        }`
      );
    });

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
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();

module.exports = app;
