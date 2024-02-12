const express = require("express");
const { connectToMongoDB } = require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
          isConnected
            ? "Database is connected 🚀"
            : "Database is not connected 😓"
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

    const SuperstitionRoute = require("./routes");
    app.use("/superstition", SuperstitionRoute);

    app.listen(port, () => {
      console.log(`App is running on PORT: ${port}`);
    });

    process.on("SIGINT", async () => {
      console.log("Received SIGINT. Shutting down gracefully...");
      await db.close();
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
};

startServer();

module.exports = app;
