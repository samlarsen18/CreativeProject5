const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  type: String,
  time: String,
  location: String,
  details: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Request = mongoose.model('Request', requestSchema);

// post pick up
router.post("/pickup", auth.verifyToken, User.verify, async (req, res) => {
  const pickUp = new Request({
    user: req.user,
    time: req.body.time,
    location: req.body.location,
    details: req.body.details,
    type: "pickup",
  });
  try {
    await pickUp.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// post drop off
router.post("/dropoff", auth.verifyToken, User.verify, async (req, res) => {
  const dropOff = new Request({
    user: req.user,
    time: req.body.time,
    location: req.body.location,
    details: req.body.details,
    type: "dropoff",
  });
  try {
    await dropOff.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/pickup", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let pickUps = await Request.find({
      user: req.user,
      type: "pickup",
    }).sort({
      created: -1
    });
    return res.send(pickUps);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/dropoff", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let dropOffs = await Request.find({
      user: req.user,
      type: "dropoff",
    }).sort({
      created: -1
    });
    return res.send(dropOffs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Logout
router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    await Request.deleteOne({

      _id: req.params.id
    })
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


module.exports = {
  model: Request,
  routes: router,
}