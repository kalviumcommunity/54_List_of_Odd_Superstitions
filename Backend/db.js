const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUri);
    console.log("Connected to MongoDB.🚀");
    return mongoose.connection;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
};

module.exports = {
  connectToMongoDB,
};
