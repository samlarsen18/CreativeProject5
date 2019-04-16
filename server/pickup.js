const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const pickUpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  time: String,
  location: String,
  details: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const PickUp = mongoose.model('PickUp', pickUpSchema);

// upload photo
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  const pickUp = new PickUp({
    user: req.user,
    time: req.body.time,
    location: req.body.location,
    details: req.body.details,
  });
  try {
    await pickUp.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let pickUps = await PickUp.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(pickUps);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: PickUp,
  routes: router,
}