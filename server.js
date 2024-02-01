const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
};

let db;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUri);
    console.log("Connected to MongoDB.🚀");
    db = mongoose.connection;
  } catch (err) {
    console.error(err);
  }
};

const startServer = async () => {
  await connectToMongoDB();

  app.get("/", (req, res) => {
    const isConnected = db ? true : false;
    res.send(
      `Database connection Status: ${
        isConnected ? "Connected" : "Disconnected"
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
};

startServer();

module.exports = app;
