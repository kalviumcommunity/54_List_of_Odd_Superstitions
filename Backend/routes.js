const express = require("express");
const schema = require("./schema");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const validationSchema = require("./uservalidation");
const userModel = require("./userSchema");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const validateRequest = (req, res, next) => {
  const { error } = validationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ error: errorMessages });
  }
  next();
};

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

router.get("/v1/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSuperstition = await schema.findById(_id);
    if (getSuperstition) {
      res.status(200).send(getSuperstition);
    } else {
      res.status(404).send("No superstitions found.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.post("/", validateRequest, async (req, res) => {
  try {
    // console.log(req.body);    //To check what is getting posted
    const newSuperstition = await schema.create(req.body);
    if (newSuperstition) {
      res.status(201).json(newSuperstition);
    } else {
      res.status(400).send("Failed to create new superstition.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.get("/login", async (req, res) => {
  try {
    const getUserDetails = await userModel.find({});
    if (getUserDetails.length > 0) {
      res.status(200).send(getUserDetails);
    } else {
      res.status(404).send("No User found.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    if (newUser) {
      const { username } = newUser;
      const token = jwt.sign(username, process.env.SECRET_KEY);
      res.status(201).json({ token });
    } else {
      res.status(400).send("Failed to create new user.");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error. Please try again later 😓.");
  }
});

router.patch("/:id", validateRequest, async (req, res) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send("Invalid ObjectId");
    }
    const getSuperstition = await schema.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
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
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send("Invalid ObjectId");
    }
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
