const express = require("express");
const schema = require("./schema");
const router = express.Router();

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const getSuperstition = await schema.find({});
    if (getSuperstition.length > 0) {
      res.status(200).send(getSuperstition);
    } else {
      res.status(404).send("No superstitions found.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);    //To check what is getting posted
    const newSuperstition = await schema.create(req.body);
    if (newSuperstition) {
      res.status(201).json(newSuperstition);
    } else {
      res.status(500).send("Failed to create new superstition.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSuperstition = await schema.findByIdAndUpdate(_id, req.body);
    if (getSuperstition) {
      res.status(200).send(getSuperstition);
    } else {
      res.status(404).send("Superstition not found.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSuperstition = await schema.findByIdAndDelete(_id);
    if (getSuperstition) {
      res.status(200).send(getSuperstition);
    } else {
      res.status(404).send("Superstition not found.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

module.exports = router;