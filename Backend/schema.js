const mongoose = require("mongoose");

const superstitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const schema = mongoose.model("superstitions", superstitionSchema);

module.exports = schema;
