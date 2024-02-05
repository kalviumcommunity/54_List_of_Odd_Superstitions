const express = require("express");
const schema = require("./schema");
const router = express.Router();

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const getSuperstition = await schema.find({});
    res.status(200).send(getSuperstition);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);    //To check what is getting posted
    const newSuperstition = await schema.create(req.body);
    if (newSuperstition) {
      res.status(201).json(newSuperstition);
    } else {
      res.status(400);
      throw new Error("Failed to Create new Superstition...");
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
    res.status(200).send(getSuperstition);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSuperstition = await schema.findByIdAndDelete(_id);
    res.status(200).send(getSuperstition);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
