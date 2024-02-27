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
      return res.status(200).send(getSuperstition);
    } else {
      return res.status(404).send("No superstitions found.");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error.", err);
  }
});

router.get("/v1/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSuperstition = await schema.findById(_id);
    if (getSuperstition) {
      return res.status(200).send(getSuperstition);
    } else {
      return res.status(404).send("No superstitions found.");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error.", err);
  }
});

router.post("/", validateRequest, async (req, res) => {
  try {
    // console.log(req.body);    //To check what is getting posted
    const newSuperstition = await schema.create(req.body);
    if (newSuperstition) {
      return res.status(201).json(newSuperstition);
    } else {
      return res.status(400).send("Failed to create new superstition.");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error.", err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    const getUserDetails = await userModel.find({});
    if (getUserDetails.length > 0) {
      return res.status(200).send(getUserDetails);
    } else {
      return res
        .status(404)
        .send("No User found with this username. Please Sign up first...");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error.", err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists with this username.");
    }
    const newUser = await userModel.create(req.body);
    if (newUser) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY);
      return res.status(201).json({ newUser, token });
    } else {
      return res.status(400).send("Failed to create new user.");
    }
  } catch (err) {
    return res.status(500).send(`Internal Server Error. ${err}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { username: user.username },
          process.env.SECRET_KEY
        );
        res.status(201).json({ user, token });
      } else {
        res.status(400).send("Incorrect Password!");
      }
    } else {
      res
        .status(400)
        .send(
          "No user found with this username. Please Signup before logging in!!"
        );
    }
  } catch (err) {
    res.status(500).send("Internal Server Error.", err);
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
    res.status(500).send("Internal Server Error.", err);
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
    res.status(500).send("Internal Server Error.", err);
  }
});

module.exports = router;
